import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import {
  FullSaunaReservationData,
  fullSaunaReservationRequestSchema,
  BookingType,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  createTimestamp,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";
import { getEventRef, getReservationsRef } from "./helpers";
import { isEqualTimes } from "utils/dist/dates/helpers";

const dataSchema = yup.object({
  requests: yup.array().of(fullSaunaReservationRequestSchema).required(),
});

export const addFullSaunaReservations = functions.https.onCall(
  async (data, context) => {
    if (!(await checkData(data, dataSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    const requests = data.requests as FullSaunaReservationData[];

    // Check for multiple requests for the same event
    for (let i = 0; i < requests.length - 1; i++) {
      for (let j = i + 1; j < requests.length; j++) {
        if (isEqualTimes(requests[i].time, requests[j].time)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "duplicate-requests"
          );
        }
      }
    }

    await admin.firestore().runTransaction(async (transaction) => {
      for (const request of requests) {
        // TODO: Could simplify time validation to just check if the time
        //       is expired because we also check if corresponding event
        //       document exists
        if (!isValidEventTime(request.time)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        const eventRef = getEventRef(
          request.saunaId,
          BookingType.fullSauna,
          request.time
        );
        const eventSnapshot = await transaction.get(eventRef);

        let eventTaken = false;
        if (eventSnapshot.exists) {
          eventTaken = eventSnapshot.get("taken");
        } else {
          // Invalid event if corresponding event document does not exist
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        if (eventTaken) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            "event-taken"
          );
        }
      }

      for (const request of requests) {
        const eventRef = getEventRef(
          request.saunaId,
          BookingType.fullSauna,
          request.time
        );

        const timestamp = createTimestamp(0);
        const reservationRef = getReservationsRef(BookingType.fullSauna).doc();

        transaction.set(reservationRef, {
          ...request,
          uid: auth.uid,
          timestamp: timestamp,
          status: ReservationStatus.active,
        });

        transaction.update(eventRef, {
          taken: true,
        });
      }
    });
  }
);

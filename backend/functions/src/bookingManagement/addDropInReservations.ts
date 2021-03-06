import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import {
  BookingType,
  dropInReservationRequestSchema,
  DropInReservationRequest,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  createTimestamp,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";
import { getEventRef, getReservationsRef } from "./helpers";
import { isEqualTimes } from "utils/dist/dates/helpers";
import { SAUNAS } from "utils/dist/bookingManagement/constants";

const dataSchema = yup.object({
  request: dropInReservationRequestSchema.required(),
});

export const addDropInReservations = functions.https.onCall(
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

    const request = data.request as DropInReservationRequest;
    const requestReservations = request.reservations;

    // Check for multiple requests for the same event
    for (let i = 0; i < requestReservations.length - 1; i++) {
      for (let j = i + 1; j < requestReservations.length; j++) {
        if (
          isEqualTimes(requestReservations[i].time, requestReservations[j].time)
        ) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "duplicate-requests"
          );
        }
      }
    }

    await admin.firestore().runTransaction(async (transaction) => {
      const saunaRef = admin
        .firestore()
        .collection(SAUNAS)
        .doc(request.saunaId);
      const sauna = await transaction.get(saunaRef);
      const duration = sauna.get("dropInSchedule.duration") as number;
      const capacity = sauna.get("capacity") as number;

      for (const requestReservation of requestReservations) {
        // TODO: Could simplify time validation to just check if the time
        //       is expired because we also check if corresponding event
        //       document exists
        if (!isValidEventTime(requestReservation.time)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        const eventRef = getEventRef(
          request.saunaId,
          BookingType.dropIn,
          requestReservation.time
        );
        const eventSnapshot = await transaction.get(eventRef);

        let spacesTaken = 0;
        if (eventSnapshot.exists) {
          spacesTaken = eventSnapshot.get("spacesTaken");
        } else {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        if (spacesTaken + requestReservation.spaces > capacity) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            "not-enough-space"
          );
        }
      }

      for (const requestReservation of requestReservations) {
        const eventRef = getEventRef(
          request.saunaId,
          BookingType.dropIn,
          requestReservation.time
        );

        const timestamp = createTimestamp(0);
        const reservationRef = getReservationsRef(BookingType.dropIn).doc();

        const reservation = {
          ...requestReservation,
          saunaId: request.saunaId,
          uid: auth.uid,
          timestamp: timestamp,
          status: ReservationStatus.active,
          duration: duration,
        };

        transaction.set(reservationRef, reservation);

        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(
            requestReservation.spaces
          ),
        });
      }
    });
  }
);

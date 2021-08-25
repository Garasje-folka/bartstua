import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import {
  BookingType,
  dropInReservationDataSchema,
  DropInReservationRequest,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  createTimestamp,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";
import {
  getEventRef,
  getReservationsRef,
  getUserReservationsRef,
} from "./helpers";
import { MAX_DROP_IN_SPACES } from "utils/dist/bookingManagement/constants";
import { isEqualTimes } from "utils/dist/dates/helpers";

const dataSchema = yup.object({
  requests: yup.array().of(dropInReservationDataSchema).required(),
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

    const requests = data.requests as DropInReservationRequest[];

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
        if (!isValidEventTime(request.time)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        const eventRef = getEventRef(
          request.location,
          BookingType.dropIn,
          request.time
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

        if (spacesTaken + request.spaces > MAX_DROP_IN_SPACES) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            "not-enough-space"
          );
        }
      }

      for (const request of requests) {
        const eventRef = getEventRef(
          request.location,
          BookingType.dropIn,
          request.time
        );

        const timestamp = createTimestamp(0);
        const reservationRef = getReservationsRef(BookingType.dropIn).doc();

        transaction.set(reservationRef, {
          ...request,
          uid: auth.uid,
          timestamp: timestamp,
          status: ReservationStatus.active,
        });

        const userReservationRef = getUserReservationsRef(
          auth.uid,
          BookingType.dropIn
        ).doc(reservationRef.id);

        transaction.set(userReservationRef, {
          ...request,
          timestamp: timestamp,
        });

        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(request.spaces),
        });
      }
    });
  }
);

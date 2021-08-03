import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { checkData } from "../helpers";
import {
  BookingType,
  DropInReservationData,
  dropInReservationDataSchema,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
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

export const addDropInReservation = functions.https.onCall(
  async (data, context) => {
    if (!(await checkData(data, dropInReservationDataSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }
    const request = data as DropInReservationData;

    if (!isValidEventTime(request.time)) {
      throw new functions.https.HttpsError("invalid-argument", "invalid-time");
    }

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    await admin.firestore().runTransaction(async (transaction) => {
      const eventRef = getEventRef(
        request.location,
        BookingType.dropIn,
        request.time
      );
      const eventSnapshot = await transaction.get(eventRef);

      let spacesTaken = 0;
      if (eventSnapshot.exists) {
        spacesTaken = eventSnapshot.get("spacesTaken");
      }

      if (spacesTaken + request.spaces > MAX_DROP_IN_SPACES) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "not-enough-space"
        );
      }

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

      if (eventSnapshot.exists) {
        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(request.spaces),
        });
      } else {
        transaction.set(eventRef, {
          time: request.time,
          spacesTaken: request.spaces,
        });
      }
    });
  }
);

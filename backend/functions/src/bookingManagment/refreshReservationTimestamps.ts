import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getReservationsRef, getUserReservationsRef } from "./helpers";
import {
  createTimestamp,
  isExpiredReservation,
} from "utils/dist/bookingManagement/helpers";
import { BookingType } from "utils/dist/bookingManagement/types";

export const refreshReservationTimestamps = functions.https.onCall(
  async (data, context) => {
    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    const currTimestamp = createTimestamp(0);

    await admin.firestore().runTransaction(async (transaction) => {
      // Booking reservations
      const userBookingReservationsRef = getUserReservationsRef(
        auth.uid,
        BookingType.booking
      );
      const userBookingReservationCollection = await transaction.get(
        userBookingReservationsRef
      );

      for (const userRes of userBookingReservationCollection.docs) {
        const data = userRes.data();
        if (!isExpiredReservation(data.time, data.timestamp)) {
          transaction.update(userRes.ref, {
            timestamp: currTimestamp,
          });

          const resRef = getReservationsRef(BookingType.booking).doc(
            userRes.id
          );

          transaction.update(resRef, {
            timestamp: currTimestamp,
          });
        }
      }

      // Drop in reservations
      const userDropInReservationsRef = getUserReservationsRef(
        auth.uid,
        BookingType.dropIn
      );
      const userDropInReservationCollection = await transaction.get(
        userDropInReservationsRef
      );

      for (const userRes of userDropInReservationCollection.docs) {
        const data = userRes.data();
        if (!isExpiredReservation(data.time, data.timestamp)) {
          transaction.update(userRes.ref, {
            timestamp: currTimestamp,
          });

          const resRef = getReservationsRef(BookingType.dropIn).doc(userRes.id);

          transaction.update(resRef, {
            timestamp: currTimestamp,
          });
        }
      }
    });
  }
);

import * as admin from "firebase-admin";
import {
  createTimestamp,
  isExpiredReservation,
} from "utils/dist/bookingManagement/helpers";
import { getUserReservationsRef } from "./getUserReservationsRef";
import { BookingType } from "utils/dist/bookingManagement/types";
import { getReservationsRef } from "./getReservationRef";

export const refreshReservationTimestampsHelper = async (uid: string) => {
  const currTimestamp = createTimestamp(0);

  await admin.firestore().runTransaction(async (transaction) => {
    // Booking reservations
    const userBookingReservationsRef = getUserReservationsRef(
      uid,
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

        const resRef = getReservationsRef(BookingType.booking).doc(userRes.id);

        transaction.update(resRef, {
          timestamp: currTimestamp,
        });
      }
    }

    // Drop in reservations
    const userDropInReservationsRef = getUserReservationsRef(
      uid,
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
};

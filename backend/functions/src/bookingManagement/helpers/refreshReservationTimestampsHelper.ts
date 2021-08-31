import * as admin from "firebase-admin";
import {
  createTimestamp,
  isExpiredReservation,
} from "utils/dist/bookingManagement/helpers";
import { BookingType } from "utils/dist/bookingManagement/types";
import { getUserReservationsQuery } from "./getUserReservationsQuery";

export const refreshReservationTimestampsHelper = async (uid: string) => {
  const currTimestamp = createTimestamp(0);

  await admin.firestore().runTransaction(async (transaction) => {
    // Full reservations
    const userBookingReservatationsQuery = getUserReservationsQuery(
      uid,
      BookingType.fullSauna
    );

    const userFullSaunaReservations = await transaction.get(
      userBookingReservatationsQuery
    );

    for (const res of userFullSaunaReservations.docs) {
      const data = res.data();
      if (!isExpiredReservation(data.time, data.timestamp)) {
        transaction.update(res.ref, {
          timestamp: currTimestamp,
        });
      }
    }

    // Drop-in reservations
    const userDropInReservationsQuery = getUserReservationsQuery(
      uid,
      BookingType.dropIn
    );
    const userDropInReservations = await transaction.get(
      userDropInReservationsQuery
    );

    for (const res of userDropInReservations.docs) {
      const data = res.data();
      if (!isExpiredReservation(data.time, data.timestamp)) {
        transaction.update(res.ref, {
          timestamp: currTimestamp,
        });
      }
    }
  });
};

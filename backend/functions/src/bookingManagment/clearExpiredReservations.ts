import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { RESERVATION_CLEARING_INTERVAL } from "./constants";
import {
  deleteBookingReservation,
  deleteDropInReservation,
  getExpiredReservations,
} from "./helpers";
import {
  BookingReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";

// TODO: rename function
export const clearExpiredReservations = functions.pubsub
  .schedule(`every ${RESERVATION_CLEARING_INTERVAL} minutes`)
  .onRun(async (context) => {
    // Clearing bookings
    admin.firestore().runTransaction(async (transaction) => {
      const expiredReservations = await getExpiredReservations(
        transaction,
        BookingType.booking
      );

      for (const res of expiredReservations.docs) {
        const { uid, ...data } = res.data();
        deleteBookingReservation(
          transaction,
          uid,
          res.id,
          data as BookingReservationData
        );
      }
    });

    // Clearing drop ins
    admin.firestore().runTransaction(async (transaction) => {
      const expiredReservations = await getExpiredReservations(
        transaction,
        BookingType.dropIn
      );

      for (const res of expiredReservations.docs) {
        const { uid, ...data } = res.data();
        deleteDropInReservation(
          transaction,
          uid,
          res.id,
          data as DropInReservationData
        );
      }
    });
  });

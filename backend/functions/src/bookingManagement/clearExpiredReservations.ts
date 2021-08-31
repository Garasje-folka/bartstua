import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { RESERVATION_CLEARING_INTERVAL } from "./constants";
import {
  deleteFullSaunaReservation,
  deleteDropInReservation,
  getExpiredReservations,
} from "./helpers";
import {
  FullSaunaReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";

export const clearExpiredReservations = functions.pubsub
  .schedule(`every ${RESERVATION_CLEARING_INTERVAL} minutes`)
  .onRun(async (context) => {
    // Clearing full sauna reservations
    admin.firestore().runTransaction(async (transaction) => {
      const expiredReservations = await getExpiredReservations(
        transaction,
        BookingType.fullSauna
      );

      for (const res of expiredReservations.docs) {
        const { uid, ...data } = res.data();
        deleteFullSaunaReservation(
          transaction,
          res.id,
          data as FullSaunaReservationData
        );
      }
    });

    // Clearing drop-in reservations
    admin.firestore().runTransaction(async (transaction) => {
      const expiredReservations = await getExpiredReservations(
        transaction,
        BookingType.dropIn
      );

      for (const res of expiredReservations.docs) {
        const { uid, ...data } = res.data();
        deleteDropInReservation(
          transaction,
          res.id,
          data as DropInReservationData
        );
      }
    });
  });

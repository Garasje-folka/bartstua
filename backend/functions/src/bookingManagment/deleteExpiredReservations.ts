import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { RESERVATION_CLEARING_INTERVAL } from "./constants";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import { deleteReservation } from "./helpers";
import { ReservationData } from "utils/dist/bookingManagement/types";

export const deleteExpiredReservations = functions.pubsub
  .schedule(`every ${RESERVATION_CLEARING_INTERVAL} minutes`)
  .onRun(async (context) => {
    // TODO: Get expired reservations with queries instead
    const reservations = await admin.firestore().collection(RESERVATIONS).get();
    for (const reservation of reservations.docs) {
      const { uid, ...reservationData } = reservation.data();
      if (isExpiredReservation(reservationData as ReservationData)) {
        await deleteReservation(reservation.id);
      }
    }
  });

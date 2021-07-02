import * as admin from "firebase-admin";
import { BOOKINGS, RESERVATIONS } from "./constants";

// This is probably just going to be a helper method
// that is used when the booking payment has been accepted
export const acceptReservation = (reservationid: string) => {
  // Transaction that converts reservation to booking
  admin.firestore().runTransaction(async (transaction) => {
    const reservationRef = admin
      .firestore()
      .collection(RESERVATIONS)
      .doc(reservationid);
    const docsnapshot = await transaction.get(reservationRef);

    await transaction.delete(reservationRef);

    const newBookingRef = admin.firestore().collection(BOOKINGS).doc();
    await transaction.set(newBookingRef, docsnapshot.data);
  });
};

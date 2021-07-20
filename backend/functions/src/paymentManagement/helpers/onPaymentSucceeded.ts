import * as admin from "firebase-admin";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../constants";
import { BOOKINGS, RESERVATIONS } from "utils/dist/bookingManagement/constants";
import {
  BookingData,
  ReservationData,
} from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";

export const onPaymentSucceeded = async (
  uid: string,
  paymentIntentId: string
) => {
  await admin.firestore().runTransaction(async (transaction) => {
    const paymentRef = admin
      .firestore()
      .collection(USERS)
      .doc(uid)
      .collection(PAYMENTS)
      .doc(paymentIntentId);
    const paymentSnapshot = await transaction.get(paymentRef);

    const paymentStatus = paymentSnapshot.get("status");
    if (paymentStatus === "succeeded") {
      console.warn(`Duplicate processing on payment: ${paymentIntentId}`);
      return;
    }

    const bookingIds = paymentSnapshot.get("bookings");

    const bookingDocs: Doc<BookingData>[] = [];

    for (const id of bookingIds) {
      const reservationRef = admin.firestore().collection(RESERVATIONS).doc(id);

      const reservationSnapshot = await transaction.get(reservationRef);

      if (!reservationSnapshot.exists) {
        // This means that a reservations has been payed for, but deleted from the database.
        // No idea how we should handle this, hopefully the situation can be avoided altogether.
        console.error(
          `User (${uid}) has payed for an expired reservation (${id})`
        );
      } else {
        const reservationData = reservationSnapshot.data() as ReservationData;
        const { timestamp, ...bookingData } = reservationData;
        const bookingDoc = {
          data: bookingData as BookingData,
          id: id,
        };
        bookingDocs.push(bookingDoc);
      }
    }

    for (const doc of bookingDocs) {
      const userReservationRef = admin
        .firestore()
        .collection(USERS)
        .doc(uid)
        .collection(RESERVATIONS)
        .doc(doc.id);
      const reservationRef = admin
        .firestore()
        .collection(RESERVATIONS)
        .doc(doc.id);

      transaction.delete(userReservationRef);
      transaction.delete(reservationRef);

      const bookingRef = admin.firestore().collection(BOOKINGS).doc(doc.id);
      transaction.set(bookingRef, doc.data);
    }

    transaction.update(paymentRef, {
      status: "succeeded",
    });
  });
};

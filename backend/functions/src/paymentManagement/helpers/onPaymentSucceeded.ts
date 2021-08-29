import * as admin from "firebase-admin";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../constants";
import {
  BookingReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { sendBookingConfirmation } from "../../emailManagement";
import { getReservationsRef } from "../../bookingManagement/helpers";

export const onPaymentSucceeded = async (
  uid: string,
  email: string,
  paymentIntentId: string
) => {
  try {
    const [bookings, dropIns] = await admin
      .firestore()
      .runTransaction(async (transaction) => {
        const paymentRef = admin
          .firestore()
          .collection(USERS)
          .doc(uid)
          .collection(PAYMENTS)
          .doc(paymentIntentId);

        // TODO: Checking for duplicate might not be necessary
        const paymentSnapshot = await transaction.get(paymentRef);

        const paymentStatus = paymentSnapshot.get("status");
        if (paymentStatus === "succeeded") {
          console.warn(`Duplicate processing on payment: ${paymentIntentId}`);
          throw "Duplicate processing on payment";
        }

        const reservationsInfo = paymentSnapshot.get("reservations");

        const bookings: BookingReservationData[] = [];
        const dropIns: DropInReservationData[] = [];

        // Retrieve reservation data to send with the booking confirmation
        for (const res of reservationsInfo) {
          const reservationRef = getReservationsRef(res.type).doc(res.id);
          const snapshot = await transaction.get(reservationRef);
          if (res.type === BookingType.booking) {
            const data = snapshot.data() as BookingReservationData;
            bookings.push(data);
          } else if (res.type === BookingType.dropIn) {
            const data = snapshot.data() as DropInReservationData;
            dropIns.push(data);
          }
        }

        for (const res of reservationsInfo) {
          const reservationRef = getReservationsRef(res.type).doc(res.id);

          transaction.update(reservationRef, {
            status: "payed",
          });
        }

        transaction.update(paymentRef, {
          status: "succeeded",
        });

        return [bookings, dropIns];
      });

    sendBookingConfirmation(email, bookings, dropIns);
  } catch (error) {
    // TODO: Handle errors, might not be needed
  }
};

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { checkAuthentication } from "../helpers";
import { getUserReservationsRef } from "../bookingManagment/helpers";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import { ReservationData } from "utils/dist/bookingManagement/types";
import { createPaymentIntent } from "../paymentManagement/helpers";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../paymentManagement/constants";

export const createBookingPaymentIntent = functions.https.onCall(
  async (data, context) => {
    const auth = checkAuthentication(context.auth);

    const [validReservations, totalSpaces] = await admin
      .firestore()
      .runTransaction(async (transaction) => {
        const reservations = await transaction.get(
          getUserReservationsRef(auth.uid)
        );

        // Filter out expired reservations
        const validReservations = reservations.docs.filter((res) => {
          const { uid, ...resData } = res.data();
          return !isExpiredReservation(resData as ReservationData);
        });

        if (validReservations.length === 0) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            "No reservations registered"
          );
        }

        let totalSpaces = 0;
        validReservations.forEach((doc) => {
          totalSpaces += doc.get("spaces");
        });

        return [validReservations, totalSpaces];
      });

    const amount = totalSpaces * 100 * 100;
    const paymentIntent = await createPaymentIntent(amount, auth.uid);

    await admin
      .firestore()
      .collection(USERS)
      .doc(auth.uid)
      .collection(PAYMENTS)
      .doc(paymentIntent.id)
      .set({
        bookings: validReservations.map((res) => res.id),
        status: "pending",
      });

    return paymentIntent;
  }
);

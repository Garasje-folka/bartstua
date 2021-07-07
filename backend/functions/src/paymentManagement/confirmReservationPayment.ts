import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { acceptReservations, getReservations } from "../bookingManagment";
import { confirmPaymentIntent, createPaymentIntent } from "./stripeUtility";
import { PAYMENTS, STRIPE_CUSTOMERS } from "./constants";

export const confirmReservationPayment = functions.https.onCall(
  async (data, context) => {
    // User authentication and validation
    const auth = context.auth;

    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    const reservations = await getReservations(auth.uid);
    if (reservations.empty) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "No reservations registered"
      );
    }

    let totalSpaces: number = 0;
    reservations.forEach((doc) => {
      totalSpaces += doc.get("spaces");
    });

    const amount = totalSpaces * 100 * 100;
    try {
      const paymentIntent = await createPaymentIntent(amount, data.paymentid);
      const res = await confirmPaymentIntent(paymentIntent.id);
      if (res.status === "succeeded") {
        const bookingIds = await acceptReservations(reservations);
        await admin
          .firestore()
          .collection(STRIPE_CUSTOMERS)
          .doc(auth.uid)
          .collection(PAYMENTS)
          .add({
            bookings: bookingIds,
          });
      }

      return res;
    } catch (error) {
      // TODO: Add proper error handling
      throw new functions.https.HttpsError("invalid-argument", "Invalid card");
    }
  }
);

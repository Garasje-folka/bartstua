import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { acceptReservations, getReservations } from "../bookingManagment";
import {
  cancelPaymentIntent,
  confirmPaymentIntent,
  createPaymentIntent,
} from "./stripeUtility";
import { PAYMENTS, STRIPE_CUSTOMERS } from "./constants";
import Stripe from "stripe";

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

    let paymentIntent: Stripe.Response<Stripe.PaymentIntent> | null = null;
    let paymentResult: Stripe.Response<Stripe.PaymentIntent> | null = null;
    try {
      const amount = totalSpaces * 100 * 100;
      paymentIntent = await createPaymentIntent(amount, data.paymentid);
      paymentResult = await confirmPaymentIntent(paymentIntent.id);
    } catch (error) {
      if (paymentIntent) await cancelPaymentIntent(paymentIntent.id);
      // TODO: Add proper error handling
      throw new functions.https.HttpsError("invalid-argument", "Invalid card");
    }

    if (paymentResult.status === "succeeded") {
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
    return paymentResult;
  }
);

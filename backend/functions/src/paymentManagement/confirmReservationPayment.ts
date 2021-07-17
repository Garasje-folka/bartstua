import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { acceptReservations } from "../bookingManagment/helpers";
import {
  cancelPaymentIntent,
  confirmPaymentIntent,
  createPaymentIntent,
} from "./helpers";
import { Stripe } from "stripe";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";
import { getUserReservationsRef } from "../bookingManagment/helpers";

const dataSchema = yup.object({
  paymentid: yup.string().required(),
});

export const confirmReservationPayment = functions.https.onCall(
  async (data, context) => {
    checkData(data, dataSchema);
    const auth = checkAuthentication(context.auth);

    return admin.firestore().runTransaction(async (transaction) => {
      const reservations = await transaction.get(
        getUserReservationsRef(auth.uid)
      );
      if (reservations.empty) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "No reservations registered"
        );
      }

      let totalSpaces = 0;
      reservations.forEach((doc) => {
        totalSpaces += doc.get("spaces");
      });

      let paymentIntent: Stripe.Response<Stripe.PaymentIntent> | null = null;
      let paymentResult: Stripe.Response<Stripe.PaymentIntent> | null = null;
      const amount = totalSpaces * 100 * 100;
      try {
        paymentIntent = await createPaymentIntent(amount, data.paymentid);
        paymentResult = await confirmPaymentIntent(paymentIntent.id);
      } catch (error) {
        if (paymentIntent) await cancelPaymentIntent(paymentIntent.id);

        // TODO: Maybe add error object to details
        // Correct https error code?
        throw new functions.https.HttpsError("invalid-argument", error.code);
      }

      if (paymentResult.status === "succeeded") {
        await acceptReservations(transaction, auth.uid, reservations);
      }

      return paymentResult;
    });
  }
);

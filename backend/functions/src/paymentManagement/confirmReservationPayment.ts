import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  acceptReservations,
  refreshReservationsTimestamp,
} from "../bookingManagment/helpers";
import {
  cancelPaymentIntent,
  confirmPaymentIntent,
  createPaymentIntent,
} from "./helpers";
import { Stripe } from "stripe";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";
import { getUserReservationsRef } from "../bookingManagment/helpers";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import { ReservationData } from "utils/dist/bookingManagement/types";

const dataSchema = yup.object({
  paymentid: yup.string().required(),
});

export const confirmReservationPayment = functions.https.onCall(
  async (data, context) => {
    checkData(data, dataSchema);
    const auth = checkAuthentication(context.auth);

    const [totalSpaces, validReservations] = await admin
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

        refreshReservationsTimestamp(transaction, validReservations);

        let totalSpaces = 0;
        validReservations.forEach((doc) => {
          totalSpaces += doc.get("spaces");
        });

        return [totalSpaces, validReservations];
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
      admin.firestore().runTransaction(async (transaction) => {
        await acceptReservations(transaction, auth.uid, validReservations);
      });
    }

    return paymentResult;
  }
);

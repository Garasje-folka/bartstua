import * as functions from "firebase-functions";
import { confirmPaymentIntent, onPaymentSucceeded } from "./helpers";

export const confirmBookingPaymentIntent = functions.https.onCall(
  async (data, context) => {
    // TODO: Check authentication
    // TODO: Validate data
    const paymentIntentId = data.paymentIntentId;
    const paymentMethodId = data.paymentMethodId;

    // TODO: Refresh reservations?
    const result = await confirmPaymentIntent(paymentIntentId, paymentMethodId);
    if (result.status === "succeeded") {
      onPaymentSucceeded(result.metadata.uid, result.metadata.email, result.id);
    }

    return result;
  }
);

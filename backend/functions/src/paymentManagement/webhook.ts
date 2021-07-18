import * as functions from "firebase-functions";
import Stripe from "stripe";
import { onPaymentSucceeded } from "./helpers";

// TODO: Check if request came from stripe using webhook secret
export const webhook = functions.https.onRequest((req, res) => {
  if (req.method === "POST") {
    const event = req.body;
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent: Stripe.PaymentIntent = event.data.object;
        onPaymentSucceeded(paymentIntent.metadata.uid, paymentIntent.id);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  res.json({ received: true });
});

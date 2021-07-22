import * as functions from "firebase-functions";
import Stripe from "stripe";
import { constructEvent, onPaymentSucceeded } from "./helpers";

export const webhook = functions.https.onRequest((req, res) => {
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    res.status(400).send("Webhook Error: No stripe signature");
    return;
  }

  let event: Stripe.Event | undefined;

  try {
    event = constructEvent(
      req.rawBody,
      sig,
      functions.config().stripe.webhook_secret
    );
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
    return;
  }

  if (req.method === "POST") {
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
        onPaymentSucceeded(
          paymentIntent.metadata.uid,
          paymentIntent.metadata.email,
          paymentIntent.id
        );
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }

  res.json({ received: true });
});

import * as functions from "firebase-functions";
import { Stripe } from "stripe";
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

const createPaymentIntent = async (spaces: number) => {
  const amount = spaces * 100 * 100;
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "nok",
    payment_method_types: ["card"],
    amount: amount,
  });
  return paymentIntent;
};

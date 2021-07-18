import * as functions from "firebase-functions";
import { Stripe } from "stripe";
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

export const createPaymentIntent = async (amount: number, uid: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "nok",
    payment_method_types: ["card"],
    amount: amount,
    metadata: {
      uid: uid,
    },
  });
  return paymentIntent;
};

export const cancelPaymentIntent = async (id: string) => {
  await stripe.paymentIntents.cancel(id);
};

export const confirmPaymentIntent = async (id: string) => {
  return await stripe.paymentIntents.confirm(id);
};

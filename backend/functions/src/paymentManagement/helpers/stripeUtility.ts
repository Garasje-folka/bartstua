import * as functions from "firebase-functions";
import { Stripe } from "stripe";
const stripe = new Stripe(functions.config().stripe.secret, {
  apiVersion: "2020-08-27",
});

export const createPaymentIntent = async (
  amount: number,
  uid: string,
  email: string
) => {
  const paymentIntent = await stripe.paymentIntents.create({
    currency: "nok",
    payment_method_types: ["card"],
    amount: amount,
    metadata: {
      uid: uid,
      email: email,
    },
    confirmation_method: "manual",
  });
  return paymentIntent;
};

export const cancelPaymentIntent = async (id: string) => {
  await stripe.paymentIntents.cancel(id);
};

export const confirmPaymentIntent = async (
  id: string,
  paymentMethodId?: string
) => {
  if (paymentMethodId) {
    return await stripe.paymentIntents.confirm(id, {
      payment_method: paymentMethodId,
    });
  } else {
    return await stripe.paymentIntents.confirm(id);
  }
};

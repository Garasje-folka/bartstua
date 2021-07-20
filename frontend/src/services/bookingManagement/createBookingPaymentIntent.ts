import { PaymentIntent } from "@stripe/stripe-js";
import firebase from "firebase";

const createBookingPaymentIntent = async (): Promise<PaymentIntent> => {
  const call = firebase.functions().httpsCallable("createBookingPaymentIntent");
  try {
    const res = await call();
    return res.data;
  } catch (error) {
    // TODO: Error handling
    throw error;
  }
};

export { createBookingPaymentIntent };

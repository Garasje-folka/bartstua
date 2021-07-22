import { PaymentIntent } from "@stripe/stripe-js";
import firebase from "firebase";

const createBookingPaymentIntent = async (
  email: string
): Promise<PaymentIntent> => {
  const call = firebase.functions().httpsCallable("createBookingPaymentIntent");
  try {
    const data = {
      email: email,
    };
    const res = await call(data);
    return res.data;
  } catch (error) {
    // TODO: Error handling
    throw error;
  }
};

export { createBookingPaymentIntent };

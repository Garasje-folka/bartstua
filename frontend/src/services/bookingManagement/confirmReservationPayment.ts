import { PaymentIntent } from "@stripe/stripe-js";
import firebase from "firebase";

const confirmReservationPayment = async (
  paymentid: string
): Promise<PaymentIntent> => {
  const call = firebase.functions().httpsCallable("confirmReservationPayment");
  try {
    const data = { paymentid: paymentid };
    const res = await call(data);
    return res.data;
  } catch (error) {
    // TODO: Add error handling
    throw error;
  }
};

export { confirmReservationPayment };

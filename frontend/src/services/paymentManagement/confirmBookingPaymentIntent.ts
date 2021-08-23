import { PaymentIntent } from "@stripe/stripe-js";
import firebase from "firebase";

const confirmBookingPaymentIntent = async (
  paymentIntentId: string,
  paymentMethodId?: string
): Promise<PaymentIntent> => {
  const call = firebase
    .functions()
    .httpsCallable("confirmBookingPaymentIntent");
  try {
    const data = {
      paymentIntentId: paymentIntentId,
      paymentMethodId: paymentMethodId,
    };
    const result = await call(data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { confirmBookingPaymentIntent };

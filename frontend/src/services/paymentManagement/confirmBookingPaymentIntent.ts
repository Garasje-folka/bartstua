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
    let data;
    if (paymentMethodId) {
      data = {
        paymentIntentId: paymentIntentId,
        paymentMethodId: paymentMethodId,
      };
    } else {
      data = {
        paymentIntentId: paymentIntentId,
      };
    }

    const result = await call(data);
    return result.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { confirmBookingPaymentIntent };

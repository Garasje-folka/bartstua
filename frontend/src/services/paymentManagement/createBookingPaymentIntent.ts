import { PaymentIntent } from "@stripe/stripe-js";
import firebase from "firebase";
import { createError } from "utils/dist/helpers";
import { CREATE_BOOKING_PAYMENT_INTENT_ERRORS } from "utils/dist/paymentManagement";

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
    switch (error.message) {
      case CREATE_BOOKING_PAYMENT_INTENT_ERRORS.USER_UNAUTHENTICATED:
        throw createError(
          CREATE_BOOKING_PAYMENT_INTENT_ERRORS.USER_UNAUTHENTICATED
        );
      case CREATE_BOOKING_PAYMENT_INTENT_ERRORS.UNEXPECTED_DATA_FORMAT:
        throw createError(
          CREATE_BOOKING_PAYMENT_INTENT_ERRORS.UNEXPECTED_DATA_FORMAT
        );
      case CREATE_BOOKING_PAYMENT_INTENT_ERRORS.NO_RESERVATIONS:
        throw createError(CREATE_BOOKING_PAYMENT_INTENT_ERRORS.NO_RESERVATIONS);
      default:
        throw createError(CREATE_BOOKING_PAYMENT_INTENT_ERRORS.UNKNOWN);
    }
  }
};

export { createBookingPaymentIntent };

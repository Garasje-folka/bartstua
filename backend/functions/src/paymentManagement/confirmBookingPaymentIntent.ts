import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { confirmPaymentIntent, onPaymentSucceeded } from "./helpers";
import {
  refreshReservationTimestampsHelper,
  getUserReservationsRef,
} from "../bookingManagement/helpers";
import * as yup from "yup";
import { checkData } from "../helpers";
import { BookingType } from "utils/dist/bookingManagement/types";
import { USERS } from "../../../../utils/dist/userManagement/constants";
import { PAYMENTS } from "./constants";
import { PaymentReservation } from "./createBookingPaymentIntent";

const dataSchema = yup.object({
  paymentIntentId: yup.string().required(),
  paymentMethodId: yup.string(),
});

export const confirmBookingPaymentIntent = functions.https.onCall(
  async (data, context) => {
    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    if (!(await checkData(data, dataSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }

    const paymentIntentId = data.paymentIntentId;
    const paymentMethodId = data.paymentMethodId;

    await refreshReservationTimestampsHelper(auth.uid);

    // TODO: Check if any reservations have expired, throw error if so
    await admin.firestore().runTransaction(async (transaction) => {
      const paymentRef = admin
        .firestore()
        .collection(USERS)
        .doc(auth.uid)
        .collection(PAYMENTS)
        .doc(paymentIntentId);

      const payment = await transaction.get(paymentRef);
      // TODO: Make type safe
      const paymentReservations = payment.get(
        "reservations"
      ) as PaymentReservation[];

      const bookingReservations = await transaction.get(
        getUserReservationsRef(auth.uid, BookingType.booking)
      );

      const dropInReservations = await transaction.get(
        getUserReservationsRef(auth.uid, BookingType.dropIn)
      );

      for (const paymentRes of paymentReservations) {
        if (
          !bookingReservations.docs.find((res) => res.id == paymentRes.id) &&
          !dropInReservations.docs.find((res) => res.id == paymentRes.id)
        ) {
          throw new functions.https.HttpsError(
            "deadline-exceeded",
            "expired-reservation"
          );
        }
      }
    });

    const result = await confirmPaymentIntent(paymentIntentId, paymentMethodId);
    if (result.status === "succeeded") {
      onPaymentSucceeded(result.metadata.uid, result.metadata.email, result.id);
    }

    return result;
  }
);

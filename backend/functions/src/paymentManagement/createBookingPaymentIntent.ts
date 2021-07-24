import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";
import { getUserReservationsRef } from "../bookingManagment/helpers";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import { ReservationData } from "utils/dist/bookingManagement/types";
import { createPaymentIntent } from "../paymentManagement/helpers";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../paymentManagement/constants";
import { CREATE_BOOKING_PAYMENT_INTENT_ERRORS } from "utils/dist/paymentManagement";

const dataSchema = yup.object({
  email: yup.string().required(),
});

export const createBookingPaymentIntent = functions.https.onCall(
  async (data, context) => {
    await checkData(data, dataSchema);
    const auth = checkAuthentication(context.auth);

    const [validReservations, totalSpaces] = await admin
      .firestore()
      .runTransaction(async (transaction) => {
        const reservations = await transaction.get(
          getUserReservationsRef(auth.uid)
        );

        // Filter out expired reservations
        const validReservations = reservations.docs.filter((res) => {
          const { uid, ...resData } = res.data();
          return !isExpiredReservation(resData as ReservationData);
        });

        if (validReservations.length === 0) {
          throw new functions.https.HttpsError(
            "failed-precondition",
            CREATE_BOOKING_PAYMENT_INTENT_ERRORS.NO_RESERVATIONS
          );
        }

        let totalSpaces = 0;
        validReservations.forEach((doc) => {
          totalSpaces += doc.get("spaces");
        });

        return [validReservations, totalSpaces];
      });

    const amount = totalSpaces * 100 * 100;
    const paymentIntent = await createPaymentIntent(
      amount,
      auth.uid,
      data.email
    );

    await admin
      .firestore()
      .collection(USERS)
      .doc(auth.uid)
      .collection(PAYMENTS)
      .doc(paymentIntent.id)
      .set({
        bookings: validReservations.map((res) => res.id),
        status: "pending",
      });

    return paymentIntent;
  }
);

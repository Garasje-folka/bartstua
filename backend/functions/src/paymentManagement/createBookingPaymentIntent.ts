import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";
import { getUserReservationsQuery } from "../bookingManagement/helpers";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import {
  BookingReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { createPaymentIntent } from "../paymentManagement/helpers";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../paymentManagement/constants";

// TODO: Validate email properly
const dataSchema = yup.object({
  email: yup.string().required(),
});

export type PaymentReservation = {
  id: string;
  type: BookingType;
};

export type UserBookingPayment = {
  reservations: PaymentReservation[];
  status: string;
};

export const createBookingPaymentIntent = functions.https.onCall(
  async (data, context) => {
    await checkData(data, dataSchema);
    const auth = checkAuthentication(context.auth);

    const [
      validBookingReservations,
      validDropInReservations,
      totalDropInSpaces,
    ] = await admin.firestore().runTransaction(async (transaction) => {
      const bookingReservations = await transaction.get(
        getUserReservationsQuery(auth.uid, BookingType.booking)
      );

      const dropInReservations = await transaction.get(
        getUserReservationsQuery(auth.uid, BookingType.dropIn)
      );

      // Filter out expired reservations
      const validBookingReservations = bookingReservations.docs.filter(
        (res) => {
          const data = res.data() as BookingReservationData;
          return !isExpiredReservation(data.time, data.timestamp);
        }
      );

      const validDropInReservations = dropInReservations.docs.filter((res) => {
        const data = res.data() as DropInReservationData;
        return !isExpiredReservation(data.time, data.timestamp);
      });

      if (
        validBookingReservations.length === 0 &&
        validDropInReservations.length === 0
      ) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "no-reservations"
        );
      }

      let totalDropInSpaces = 0;
      validDropInReservations.forEach((doc) => {
        totalDropInSpaces += doc.get("spaces");
      });

      return [
        validBookingReservations,
        validDropInReservations,
        totalDropInSpaces,
      ];
    });

    const bookingAmount = validBookingReservations.length * 100 * 100;
    const dropInAmount = totalDropInSpaces * 100 * 100;
    const paymentIntent = await createPaymentIntent(
      bookingAmount + dropInAmount,
      auth.uid,
      data.email
    );

    const bookingPaymentData = validBookingReservations.map((res) => {
      return {
        type: BookingType.booking,
        id: res.id,
      };
    });

    const dropInPaymentData = validDropInReservations.map((res) => {
      return {
        type: BookingType.dropIn,
        id: res.id,
      };
    });

    // Should this be done inside a transaction?
    await admin
      .firestore()
      .collection(USERS)
      .doc(auth.uid)
      .collection(PAYMENTS)
      .doc(paymentIntent.id)
      .set({
        reservations: [...bookingPaymentData, ...dropInPaymentData],
        status: "pending",
      });

    return paymentIntent;
  }
);

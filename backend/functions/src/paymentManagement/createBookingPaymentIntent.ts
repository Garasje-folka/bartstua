import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";
import { getUserReservationsQuery } from "../bookingManagement/helpers";
import { isExpiredReservation } from "utils/dist/bookingManagement/helpers";
import {
  FullSaunaReservationData,
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
      validFullSaunaReservations,
      validDropInReservations,
      totalDropInSpaces,
    ] = await admin.firestore().runTransaction(async (transaction) => {
      const fullSaunaReservations = await transaction.get(
        getUserReservationsQuery(auth.uid, BookingType.fullSauna)
      );

      const dropInReservations = await transaction.get(
        getUserReservationsQuery(auth.uid, BookingType.dropIn)
      );

      // Filter out expired reservations
      const validFullSaunaReservations = fullSaunaReservations.docs.filter(
        (res) => {
          const data = res.data() as FullSaunaReservationData;
          return !isExpiredReservation(data.time, data.timestamp);
        }
      );

      const validDropInReservations = dropInReservations.docs.filter((res) => {
        const data = res.data() as DropInReservationData;
        return !isExpiredReservation(data.time, data.timestamp);
      });

      if (
        validFullSaunaReservations.length === 0 &&
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
        validFullSaunaReservations,
        validDropInReservations,
        totalDropInSpaces,
      ];
    });

    const fullSaunaAmount = validFullSaunaReservations.length * 100 * 100;
    const dropInAmount = totalDropInSpaces * 100 * 100;
    const paymentIntent = await createPaymentIntent(
      fullSaunaAmount + dropInAmount,
      auth.uid,
      data.email
    );

    const bookingPaymentData = validFullSaunaReservations.map((res) => {
      return {
        type: BookingType.fullSauna,
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

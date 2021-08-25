import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteDropInReservation, getUserReservationsRef } from "./helpers";
import * as yup from "yup";
import { checkData } from "../helpers";
import {
  BookingReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { deleteBookingReservation } from "./helpers/deleteBookingReservation";

const dataSchema = yup.object({
  docid: yup.string().required(),
  type: yup.mixed<BookingType>().oneOf(Object.values(BookingType)).required(),
});

export const cancelReservation = functions.https.onCall(
  async (data, context) => {
    if (!(await checkData(data, dataSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    const type = data.type as BookingType;

    admin.firestore().runTransaction(async (transaction) => {
      const userReservationRef = getUserReservationsRef(auth.uid, type).doc(
        data.docid
      );

      const reservationSnapshot = await transaction.get(userReservationRef);
      if (!reservationSnapshot.exists) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "no-corresponding-reservation"
        );
      }

      if (type == BookingType.booking) {
        const reservationData =
          reservationSnapshot.data() as BookingReservationData;
        deleteBookingReservation(
          transaction,
          auth.uid,
          data.docid,
          reservationData
        );
      } else if (type == BookingType.dropIn) {
        const reservationData =
          reservationSnapshot.data() as DropInReservationData;
        deleteDropInReservation(
          transaction,
          auth.uid,
          data.docid,
          reservationData
        );
      }
    });
  }
);

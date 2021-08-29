import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteDropInReservation, getReservationsRef } from "./helpers";
import * as yup from "yup";
import { checkData } from "../helpers";
import {
  FullSaunaReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { deleteFullSaunaReservation } from "./helpers/deleteFullSaunaReservation";

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
      const reservationRef = getReservationsRef(type).doc(data.docid);

      const reservationSnapshot = await transaction.get(reservationRef);
      if (!reservationSnapshot.exists) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "no-corresponding-reservation"
        );
      }

      if (type == BookingType.fullSauna) {
        const reservationData =
          reservationSnapshot.data() as FullSaunaReservationData;
        deleteFullSaunaReservation(transaction, data.docid, reservationData);
      } else if (type == BookingType.dropIn) {
        const reservationData =
          reservationSnapshot.data() as DropInReservationData;
        deleteDropInReservation(transaction, data.docid, reservationData);
      }
    });
  }
);

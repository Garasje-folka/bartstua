import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { deleteDropInReservation } from "./helpers";
import * as yup from "yup";
import { checkData } from "../helpers";
import { USERS } from "utils/dist/userManagement/constants";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import {
  BookingReservationData,
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { deleteBookingReservation } from "./helpers/deleteBookingReservation";

const dataSchema = yup.object({
  docid: yup.string().required(),
});

export const cancelReservation = functions.https.onCall(
  async (data, context) => {
    await checkData(data, dataSchema);

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    admin.firestore().runTransaction(async (transaction) => {
      const userReservationRef = admin
        .firestore()
        .collection(USERS)
        .doc(auth.uid)
        .collection(RESERVATIONS)
        .doc(data.docid);

      const reservationSnapshot = await transaction.get(userReservationRef);
      if (!reservationSnapshot.exists) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "no-corresponding-reservation"
        );
      }

      const type = reservationSnapshot.get("type");
      if (type == BookingType.booking) {
        const reservationData = reservationSnapshot.get(
          "data"
        ) as BookingReservationData;
        deleteBookingReservation(
          transaction,
          auth.uid,
          data.docid,
          reservationData
        );
      } else if (type == BookingType.dropIn) {
        const reservationData = reservationSnapshot.get(
          "data"
        ) as DropInReservationData;
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

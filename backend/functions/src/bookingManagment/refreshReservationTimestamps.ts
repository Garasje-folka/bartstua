import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { checkAuthentication } from "../helpers";
import { getUserReservationsRef } from "./helpers";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import {
  createTimestamp,
  isExpiredReservation,
} from "utils/dist/bookingManagement/helpers";
import { ReservationData } from "utils/dist/bookingManagement/types";

/*
export const refreshReservationTimestamps = functions.https.onCall(
  async (data, context) => {
    const auth = checkAuthentication(context.auth);
    const currTimestamp = createTimestamp(0);

    await admin.firestore().runTransaction(async (transaction) => {
      const userReservationsRef = getUserReservationsRef(auth.uid);
      const userReservationCollection = await transaction.get(
        userReservationsRef
      );

      for (const userRes of userReservationCollection.docs) {
        if (!isExpiredReservation(userRes.data() as ReservationData)) {
          transaction.update(userRes.ref, {
            timestamp: currTimestamp,
          });

          const resRef = admin
            .firestore()
            .collection(RESERVATIONS)
            .doc(userRes.id);

          transaction.update(resRef, {
            timestamp: currTimestamp,
          });
        }
      }
    });
  }
);
*/

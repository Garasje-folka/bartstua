import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { getEventRef } from "./getEventRef";
import { getUserReservationsRef } from "./getUserReservationsRef";
import { CANCEL_RESERVATION_ERRORS } from "utils/dist/bookingManagement/errors";

export const deleteReservation = async (docid: string, uid?: string) => {
  await admin.firestore().runTransaction(async (transaction) => {
    const reservationRef = admin
      .firestore()
      .collection(RESERVATIONS)
      .doc(docid);
    const reservationSnapshot = await transaction.get(reservationRef);

    if (reservationSnapshot.exists) {
      const reservationUid = reservationSnapshot.get("uid");
      if (uid) {
        if (reservationUid !== uid) {
          throw new functions.https.HttpsError(
            "permission-denied",
            CANCEL_RESERVATION_ERRORS.NOT_OWNER
          );
        }
      }

      const date = reservationSnapshot.get("date");
      const eventRef = getEventRef(date);
      const eventSnapshot = await transaction.get(eventRef);

      if (eventSnapshot.exists) {
        const spaces = reservationSnapshot.get("spaces");

        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(-spaces),
        });
      }

      transaction.delete(reservationRef);

      const userReservationRef = getUserReservationsRef(reservationUid).doc(
        reservationRef.id
      );
      transaction.delete(userReservationRef);
    }
  });
};

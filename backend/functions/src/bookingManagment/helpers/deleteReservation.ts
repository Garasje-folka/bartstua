import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { getEventRef } from "./getEventRef";

export const deleteReservation = async (docid: string, uid?: string) => {
  await admin.firestore().runTransaction(async (transaction) => {
    const reservationRef = admin
      .firestore()
      .collection(RESERVATIONS)
      .doc(docid);
    const reservationSnapshot = await transaction.get(reservationRef);

    if (reservationSnapshot.exists) {
      if (uid) {
        if (reservationSnapshot.get("uid") !== uid) {
          throw new functions.https.HttpsError(
            "permission-denied",
            "Not owner of reservation"
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
    }
  });
};

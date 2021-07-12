import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { EVENTS, RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { getEvent } from "./getEvent";

export const deleteReservation = async (docid: string, uid?: string) => {
  await admin.firestore().runTransaction(async (transaction) => {
    const docRef = admin.firestore().collection(RESERVATIONS).doc(docid);
    const docSnapshot = await transaction.get(docRef);

    if (docSnapshot.exists) {
      const date = docSnapshot.get("date");
      const event = await getEvent(date);

      if (uid) {
        if (docSnapshot.get("uid") !== uid) {
          throw new functions.https.HttpsError(
            "permission-denied",
            "Not owner of reservation"
          );
        }
      }

      if (event) {
        const spaces = docSnapshot.get("spaces");
        const eventRef = admin.firestore().collection(EVENTS).doc(event.id);

        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(-spaces),
        });

        transaction.delete(docRef);
      }
    }
  });
};

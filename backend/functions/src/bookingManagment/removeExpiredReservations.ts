import * as admin from "firebase-admin";
import { EVENTS, RESERVATIONS } from "./constants";
import { getEvent } from "./getEvent";

export const removeExpiredReservation = (docid: string) => {
  admin.firestore().runTransaction(async (transaction) => {
    const docRef = admin.firestore().collection(RESERVATIONS).doc(docid);
    const docSnapshot = await transaction.get(docRef);

    if (docSnapshot.exists) {
      const date = docSnapshot.get("date");
      const event = await getEvent(date);

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

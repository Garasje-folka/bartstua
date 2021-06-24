import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getEvent } from "./getEvent";
import { BOOKINGS, EVENTS, MAX_EVENT_SPACES } from "./constants";

exports.addBooking = functions.https.onCall((data, context) => {
  // TODO: Throw error instead
  if (data.spaces <= 0) return;

  admin.firestore().runTransaction(async (transaction) => {
    try {
      const event = await getEvent(data.date);

      let spacesTaken: number = 0;

      if (event) {
        const eventRef = admin.firestore().collection(EVENTS).doc(event.id);
        const docSnapshot = await transaction.get(eventRef);

        if (docSnapshot.exists) spacesTaken = docSnapshot.get("spacesTaken");
      }

      if (spacesTaken + data.spaces > MAX_EVENT_SPACES) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Not enough space"
        );
      }

      const newBookingRef = admin.firestore().collection(BOOKINGS).doc();

      transaction.set(newBookingRef, data);
    } catch (error) {
      console.log(error);
    }
  });
});

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getEvent } from "./getEvent";
import { BOOKINGS, EVENTS, MAX_EVENT_SPACES } from "./constants";
import { bookingDataSchema } from "./types";

exports.addBooking = functions.https.onCall(async (data, context) => {
  try {
    await bookingDataSchema.validate(data);
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Not the expected data format"
    );
  }

  // TODO: User validation

  // TODO: Don't think this is correct error handling...
  try {
    await admin.firestore().runTransaction(async (transaction) => {
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
    });
  } catch (error) {
    throw error;
  }
});

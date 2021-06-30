import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getEvent } from "./getEvent";
import { EVENTS, MAX_EVENT_SPACES, RESERVATIONS } from "./constants";
import { bookingDataSchema } from "./types";
import isValidEventDate from "./helpers/isValidEventDate";
import createTimestamp from "./helpers/createTimestamp";

export const addReservation = functions.https.onCall(async (data, context) => {
  // Check data format
  try {
    await bookingDataSchema.validate(data);
  } catch (error) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Not the expected data format"
    );
  }

  // Date validation
  if (!isValidEventDate(data.date)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid date");
  }

  // User authentication and validation
  const auth = context.auth;

  if (!auth || auth.uid !== data.uid || auth.token.uid !== auth.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );
  }

  // Transaction that adds the reservation to firestore
  // TODO: Don't know if this is the correct way to catch the errors
  try {
    await admin.firestore().runTransaction(async (transaction) => {
      const event = await getEvent(data.date);
      let eventRef:
        | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
        | undefined = undefined;

      let spacesTaken: number = 0;

      if (event) {
        eventRef = admin.firestore().collection(EVENTS).doc(event.id);
        const docSnapshot = await transaction.get(eventRef);

        if (docSnapshot.exists) spacesTaken = docSnapshot.get("spacesTaken");
      }

      if (spacesTaken + data.spaces > MAX_EVENT_SPACES) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "Not enough space"
        );
      }

      const newReservationRef = admin
        .firestore()
        .collection(RESERVATIONS)
        .doc();

      const timestamp = createTimestamp(new Date());
      transaction.set(newReservationRef, {
        ...data,
        timestamp: timestamp,
      });

      // Increment event spaces counter
      if (eventRef) {
        transaction.update(eventRef, {
          spacesTaken: admin.firestore.FieldValue.increment(data.spaces),
        });
      } else {
        eventRef = admin.firestore().collection(EVENTS).doc();
        transaction.set(eventRef, {
          date: data.date,
          spacesTaken: data.spaces,
        });
      }
    });
  } catch (error) {
    throw error;
  }
});

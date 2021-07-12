import {
  EVENTS,
  MAX_EVENT_SPACES,
  RESERVATIONS,
  RESERVATION_EXPIRATION_TIME,
} from "utils/dist/bookingManagement/constants";
import { getEvent } from "./getEvent";
import { BookingData, EventData } from "utils/dist/bookingManagement/types";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { deleteReservation } from "./deleteReservation";

// TODO: Rename...
export const addReservationHelper = async (
  transaction: FirebaseFirestore.Transaction,
  reservation: BookingData
) => {
  const event = await getEvent(reservation.date);
  let eventRef:
    | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
    | undefined = undefined;

  let spacesTaken: number = 0;

  if (event) {
    // Event already exists
    eventRef = admin.firestore().collection(EVENTS).doc(event.id);
    const docSnapshot = await transaction.get(eventRef);

    if (docSnapshot.exists) {
      const eventData = docSnapshot.data() as EventData;
      spacesTaken = eventData.spacesTaken;
    }
  }

  if (spacesTaken + reservation.spaces > MAX_EVENT_SPACES) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Not enough space"
    );
  }

  const newReservationRef = admin.firestore().collection(RESERVATIONS).doc();

  transaction.set(newReservationRef, reservation);

  // Increment event spaces counter
  if (event && eventRef) {
    transaction.update(eventRef, {
      spacesTaken: admin.firestore.FieldValue.increment(reservation.spaces),
    });
  } else {
    eventRef = admin.firestore().collection(EVENTS).doc();
    transaction.set(eventRef, {
      date: reservation.date,
      spacesTaken: reservation.spaces,
    });
  }

  setTimeout(() => {
    deleteReservation(newReservationRef.id);
  }, RESERVATION_EXPIRATION_TIME * 60 * 1000);
};

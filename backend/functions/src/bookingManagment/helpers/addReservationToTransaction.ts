import {
  MAX_EVENT_SPACES,
  RESERVATIONS,
  RESERVATION_EXPIRATION_TIME,
} from "utils/dist/bookingManagement/constants";
import {
  BookingData,
  BookingRequest,
} from "utils/dist/bookingManagement/types";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { deleteReservation } from "./deleteReservation";
import { getEventRef } from "./getEventRef";
import { USERS } from "utils/dist/userManagement/constants";

export const addReservationToTransaction = async (
  transaction: FirebaseFirestore.Transaction,
  request: BookingRequest,
  uid: string
) => {
  let spacesTaken: number = 0;

  const reservation: BookingData = {
    ...request,
    uid: uid,
  };

  const eventRef = getEventRef(request.date);
  const eventSnapshot = await transaction.get(eventRef);

  if (eventSnapshot.exists) {
    spacesTaken = eventSnapshot.get("spacesTaken");
  }

  if (spacesTaken + reservation.spaces > MAX_EVENT_SPACES) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "Not enough space"
    );
  }

  const reservationRef = admin.firestore().collection(RESERVATIONS).doc();
  const userReservationRef = admin
    .firestore()
    .collection(USERS)
    .doc(uid)
    .collection(RESERVATIONS)
    .doc(reservationRef.id);

  // TODO: Should await be used here?
  transaction.set(reservationRef, reservation);
  transaction.set(userReservationRef, request);

  // Increment event spaces counter
  if (eventSnapshot.exists) {
    transaction.update(eventRef, {
      spacesTaken: admin.firestore.FieldValue.increment(reservation.spaces),
    });
  } else {
    transaction.set(eventRef, {
      date: reservation.date,
      spacesTaken: reservation.spaces,
    });
  }

  setTimeout(() => {
    deleteReservation(reservationRef.id);
  }, RESERVATION_EXPIRATION_TIME * 60 * 1000);
};

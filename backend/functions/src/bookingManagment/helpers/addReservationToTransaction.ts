import {
  MAX_EVENT_SPACES,
  RESERVATIONS,
  RESERVATION_EXPIRATION_TIME,
} from "utils/dist/bookingManagement/constants";
import {
  ReservationData,
  ReservationRequest,
} from "utils/dist/bookingManagement/types";
import { createTimestamp } from "utils/dist/bookingManagement/helpers";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { deleteReservation } from "./deleteReservation";
import { getEventRef } from "./getEventRef";
import { USERS } from "utils/dist/userManagement/constants";

export const addReservationToTransaction = async (
  transaction: FirebaseFirestore.Transaction,
  request: ReservationRequest,
  uid: string
) => {
  let spacesTaken: number = 0;

  const timestamp = createTimestamp(0);

  const reservation: ReservationData = {
    ...request,
    timestamp: timestamp,
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

  transaction.set(reservationRef, {
    ...reservation,
    uid: uid,
  });
  transaction.set(userReservationRef, reservation);

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

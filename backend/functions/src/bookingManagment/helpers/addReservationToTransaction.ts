import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import {
  ReservationData,
  ReservationRequest,
} from "utils/dist/bookingManagement/types";
import { createTimestamp } from "utils/dist/bookingManagement/helpers";
import * as admin from "firebase-admin";
import { getEventRef } from "./getEventRef";
import { USERS } from "utils/dist/userManagement/constants";

export const addReservationToTransaction = (
  transaction: FirebaseFirestore.Transaction,
  request: ReservationRequest,
  uid: string,
  eventExists: boolean
) => {
  const timestamp = createTimestamp(0);

  const reservation: ReservationData = {
    ...request,
    timestamp: timestamp,
  };

  const eventRef = getEventRef(request.date);

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
  if (eventExists) {
    transaction.update(eventRef, {
      spacesTaken: admin.firestore.FieldValue.increment(request.spaces),
    });
  } else {
    transaction.set(eventRef, {
      date: reservation.date,
      spacesTaken: request.spaces,
    });
  }
};

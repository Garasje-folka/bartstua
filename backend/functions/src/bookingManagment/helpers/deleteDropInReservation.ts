import * as admin from "firebase-admin";
import {
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { getReservationsRef } from "./getReservationRef";
import { getUserReservationsRef } from "./getUserReservationsRef";

export const deleteDropInReservation = (
  transaction: FirebaseFirestore.Transaction,
  uid: string,
  docid: string,
  data: DropInReservationData
) => {
  const reservationRef = getReservationsRef(
    data.location,
    BookingType.dropIn
  ).doc(docid);
  transaction.delete(reservationRef);

  const userReservationRef = getUserReservationsRef(
    uid,
    BookingType.dropIn
  ).doc(docid);
  transaction.delete(userReservationRef);

  const eventRef = getEventRef(data.location, BookingType.dropIn, data.time);
  transaction.update(eventRef, {
    spacesTaken: admin.firestore.FieldValue.increment(-data.spaces),
  });
};

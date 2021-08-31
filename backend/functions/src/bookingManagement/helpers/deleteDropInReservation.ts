import * as admin from "firebase-admin";
import {
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { getReservationsRef } from "./getReservationRef";

export const deleteDropInReservation = (
  transaction: FirebaseFirestore.Transaction,
  docid: string,
  data: DropInReservationData
) => {
  const reservationRef = getReservationsRef(BookingType.dropIn).doc(docid);
  transaction.delete(reservationRef);

  const eventRef = getEventRef(data.location, BookingType.dropIn, data.time);
  transaction.update(eventRef, {
    spacesTaken: admin.firestore.FieldValue.increment(-data.spaces),
  });
};

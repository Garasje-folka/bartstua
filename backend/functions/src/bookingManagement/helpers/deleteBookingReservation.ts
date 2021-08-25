import {
  BookingReservationData,
  BookingType,
} from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { getReservationsRef } from "./getReservationRef";
import { getUserReservationsRef } from "./getUserReservationsRef";

export const deleteBookingReservation = (
  transaction: FirebaseFirestore.Transaction,
  uid: string,
  docid: string,
  data: BookingReservationData
) => {
  const reservationRef = getReservationsRef(BookingType.booking).doc(docid);
  transaction.update(reservationRef, {
    status: "expired",
  });

  const userReservationRef = getUserReservationsRef(
    uid,
    BookingType.booking
  ).doc(docid);
  transaction.delete(userReservationRef);

  const eventRef = getEventRef(data.location, BookingType.booking, data.time);
  transaction.update(eventRef, {
    taken: false,
  });
};

import {
  BookingReservationData,
  BookingType,
} from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { getReservationsRef } from "./getReservationRef";

export const deleteBookingReservation = (
  transaction: FirebaseFirestore.Transaction,
  docid: string,
  data: BookingReservationData
) => {
  const reservationRef = getReservationsRef(BookingType.booking).doc(docid);
  transaction.delete(reservationRef);

  const eventRef = getEventRef(data.location, BookingType.booking, data.time);
  transaction.update(eventRef, {
    taken: false,
  });
};

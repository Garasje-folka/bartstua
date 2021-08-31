import {
  FullSaunaReservationData,
  BookingType,
} from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { getReservationsRef } from "./getReservationRef";

export const deleteFullSaunaReservation = (
  transaction: FirebaseFirestore.Transaction,
  docid: string,
  data: FullSaunaReservationData
) => {
  const reservationRef = getReservationsRef(BookingType.fullSauna).doc(docid);
  transaction.delete(reservationRef);

  const eventRef = getEventRef(data.location, BookingType.fullSauna, data.time);
  transaction.update(eventRef, {
    taken: false,
  });
};

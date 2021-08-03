import { BOOKING_RESERVATIONS, DROP_IN_RESERVATIONS } from "../constants";
import { BookingType } from "../types";

const getReservationCollectionName = (type: BookingType) => {
  switch (type) {
    case BookingType.booking:
      return BOOKING_RESERVATIONS;
    case BookingType.dropIn:
      return DROP_IN_RESERVATIONS;
  }
};

export { getReservationCollectionName };

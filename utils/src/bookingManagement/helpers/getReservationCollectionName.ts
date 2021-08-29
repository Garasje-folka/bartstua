import { FULL_SAUNA_RESERVATIONS, DROP_IN_RESERVATIONS } from "../constants";
import { BookingType } from "../types";

const getReservationCollectionName = (type: BookingType) => {
  switch (type) {
    case BookingType.fullSauna:
      return FULL_SAUNA_RESERVATIONS;
    case BookingType.dropIn:
      return DROP_IN_RESERVATIONS;
  }
};

export { getReservationCollectionName };

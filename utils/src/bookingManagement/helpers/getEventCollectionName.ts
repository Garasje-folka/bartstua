import { FULL_SAUNA_EVENTS, DROP_IN_EVENTS } from "../constants";
import { BookingType } from "../types";

const getEventCollectionName = (type: BookingType) => {
  switch (type) {
    case BookingType.fullSauna:
      return FULL_SAUNA_EVENTS;
    case BookingType.dropIn:
      return DROP_IN_EVENTS;
  }
};

export { getEventCollectionName };

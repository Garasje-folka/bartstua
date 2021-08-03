import { BOOKING_EVENTS, DROP_IN_EVENTS } from "../constants";
import { BookingType } from "../types";

const getEventCollectionName = (type: BookingType) => {
  switch (type) {
    case BookingType.booking:
      return BOOKING_EVENTS;
    case BookingType.dropIn:
      return DROP_IN_EVENTS;
  }
};

export { getEventCollectionName };

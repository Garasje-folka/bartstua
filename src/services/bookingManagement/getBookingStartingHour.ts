import { FIRST_EVENT_TIME, LAST_EVENT_TIME } from "./constants";
import isAfterToday from "./helpers/isAfterToday";
import { isToday } from "./helpers/isToday";
import { DateDay } from "./interfaces";

// Returns the first valid bookingEvent hour for the given DateDay
// Returns undefined if there is no valid starting hour for the given DateDay

// TODO: Rename function...
const getBookingEventStartingHour = (dateDay: DateDay) => {
  if (isToday(dateDay)) {
    const currentHour = new Date().getHours();
    if (currentHour > FIRST_EVENT_TIME) {
      if (currentHour > LAST_EVENT_TIME) return undefined;
      else return currentHour;
    }
  } else if (isAfterToday(dateDay)) return FIRST_EVENT_TIME;

  return undefined;
};

export { getBookingEventStartingHour };

import {
  BOOKING_STARTING_TIME,
  BOOKING_ENDING_TIME,
} from "utils/dist/bookingManagement/constants";
import { isAfterToday } from "utils/dist/dates/helpers";
import { isToday } from "utils/dist/dates/helpers";
import { DateDay } from "utils/dist/dates/types";

// Returns the first valid event hour for the given DateDay
// Returns undefined if there is no valid starting hour for the given DateDay

// TODO: Rename function...
const getEventStartingHour = (dateDay: DateDay) => {
  if (isToday(dateDay)) {
    const currentHour = new Date().getHours();
    if (currentHour > BOOKING_STARTING_TIME) {
      if (currentHour > BOOKING_ENDING_TIME) return undefined;
      else return currentHour;
    }
  } else if (isAfterToday(dateDay)) return BOOKING_STARTING_TIME;

  return undefined;
};

export { getEventStartingHour };

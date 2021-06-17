import parseDateHour from "./helpers/parseDateHour";
import { DateHour } from "./interfaces";

const getBookingEventId = (date: DateHour) => {
  return parseDateHour(date, true, true, true, true);
};

export { getBookingEventId };

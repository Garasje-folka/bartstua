import parseDateHour from "./helpers/parseDateHour";
import { DateHour } from "./interfaces";

const getEventId = (date: DateHour) => {
  return parseDateHour(date, true, true, true, true);
};

export { getEventId };

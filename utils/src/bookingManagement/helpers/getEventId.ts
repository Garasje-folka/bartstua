import { DateHour } from "../../dates/types";
import { dateHourToISO } from "../../dates/helpers";

const getEventId = (date: DateHour) => {
  return dateHourToISO(date, true, true, true, true);
};

export { getEventId };

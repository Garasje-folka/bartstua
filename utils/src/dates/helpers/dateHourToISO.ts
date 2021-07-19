import { DateHour } from "../types";
import { dateDayToISO } from "./dateDayToISO";

const dateHourToISO = (
  date: DateHour,
  includeYear: boolean,
  includeMonth: boolean,
  includeDay: boolean,
  includeHour: boolean
) => {
  let parsed = dateDayToISO(date, includeYear, includeMonth, includeDay);

  if (includeHour) parsed += "T" + ("0" + date.hour).slice(-2);

  return parsed.trim();
};

export { dateHourToISO };

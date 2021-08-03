import { DateTime } from "../types";
import { dateDayToISO } from "./dateDayToISO";

const dateTimeToISO = (
  date: DateTime,
  includeYear: boolean,
  includeMonth: boolean,
  includeDay: boolean,
  includeTime: boolean
) => {
  let parsed = dateDayToISO(date, includeYear, includeMonth, includeDay);

  if (includeTime)
    parsed +=
      "T" + ("0" + date.hour).slice(-2) + ":" + ("0" + date.minute).slice(-2);

  return parsed.trim();
};

export { dateTimeToISO };

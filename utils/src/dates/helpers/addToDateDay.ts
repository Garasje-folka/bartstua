import { DateDay } from "../types";
import { createDateDayFromDate } from "./createDateDay";
import { createDateFromDateDay } from "./createDateFromDateDay";

// Takes daylight savings into account
// Source: https://stackoverflow.com/questions/3674539/incrementing-a-date-in-javascript/3674550
const addToDateDay = (dateDay: DateDay, daysToAdd: number): DateDay => {
  const date = createDateFromDateDay(dateDay);
  let tzOff = date.getTimezoneOffset() * 60 * 1000,
    t = date.getTime(),
    d = new Date(),
    tzOff2;

  t += 1000 * 60 * 60 * 24 * daysToAdd;
  d.setTime(t);

  tzOff2 = d.getTimezoneOffset() * 60 * 1000;
  if (tzOff != tzOff2) {
    var diff = tzOff2 - tzOff;
    t += diff;
    d.setTime(t);
  }

  return createDateDayFromDate(d);
};

export { addToDateDay };

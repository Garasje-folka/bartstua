import { DateHour, DateDay } from "../types";
import { createDateDayFromDate } from "./createDateDay";

const createDateHourFromDate = (date: Date): DateHour => {
  return {
    ...createDateDayFromDate(date),
    hour: date.getHours(),
  };
};

const createDateHourFromDateDay = (
  dateDay: DateDay,
  hour: number
): DateHour => {
  return {
    ...dateDay,
    hour: hour,
  };
};

export { createDateHourFromDate, createDateHourFromDateDay };

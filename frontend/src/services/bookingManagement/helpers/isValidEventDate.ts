import { BOOKING_ENDING_TIME, BOOKING_STARTING_TIME } from "../constants";
import { DateHour } from "bartstua-shared";
import isBeforeToday from "./isBeforeToday";
import { isToday } from "./isToday";
import isValidDateHour from "./isValidDateHour";

const isValidEventDate = (date: DateHour) => {
  if (!isValidDateHour(date)) return false;

  if (date.hour < BOOKING_STARTING_TIME || date.hour > BOOKING_ENDING_TIME)
    return false;

  if (isBeforeToday(date)) return false;

  const currentDate = new Date();
  if (isToday(date)) {
    return currentDate.getHours() <= date.hour;
  }

  return true;
};

export default isValidEventDate;

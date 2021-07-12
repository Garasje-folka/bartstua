import { DateHour } from "../types";
import { isValidDate } from "./isValidDate";

const isValidDateHour = (date: DateHour) => {
  return isValidDate(date.year, date.month, date.day, date.hour);
};

export { isValidDateHour };

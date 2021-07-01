import { DateHour } from "bartstua-shared";
import isValidDate from "./isValidDate";

const isValidDateHour = (date: DateHour) => {
  return isValidDate(date.year, date.month, date.day, date.hour);
};

export default isValidDateHour;

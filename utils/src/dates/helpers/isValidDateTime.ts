import { DateTime } from "../types";
import { isValidDate } from "./isValidDate";

const isValidDateTime = (date: DateTime) => {
  return isValidDate(date.year, date.month, date.day, date.hour, date.minute);
};

export { isValidDateTime };

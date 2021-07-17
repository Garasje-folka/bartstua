import { DateHour } from "../types";

const isEqualDates = (d1: DateHour, d2: DateHour) => {
  return JSON.stringify(d1) === JSON.stringify(d2);
};

export { isEqualDates };

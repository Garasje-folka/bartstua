import { DateTime } from "../types";

const isEqualTimes = (d1: DateTime, d2: DateTime) => {
  return JSON.stringify(d1) === JSON.stringify(d2);
};

export { isEqualTimes };

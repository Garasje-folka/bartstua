import { RESERVATION_EXPIRATION_TIME } from "../constants";
import { createTimestamp } from "./createTimestamp";
import { isBeforeToday, isToday } from "../../dates/helpers";
import { DateTime } from "../../dates/types";

const isExpiredReservation = (time: DateTime, timestamp: number) => {
  const thresholdTimestamp = createTimestamp(-RESERVATION_EXPIRATION_TIME);

  if (timestamp <= thresholdTimestamp) return true;

  if (isBeforeToday(time)) return true;
  if (isToday(time)) {
    const currDate = new Date();
    if (time.hour < currDate.getHours()) return true;
  }

  return false;
};

export { isExpiredReservation };

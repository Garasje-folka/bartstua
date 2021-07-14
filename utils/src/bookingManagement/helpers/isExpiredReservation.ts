import { RESERVATION_EXPIRATION_TIME } from "../constants";
import { ReservationData } from "../types";
import { createTimestamp } from "./createTimestamp";
import { isBeforeToday, isToday } from "../../dates/helpers";

const isExpiredReservation = (reservation: ReservationData) => {
  const thresholdTimestamp = createTimestamp(-RESERVATION_EXPIRATION_TIME);

  if (reservation.timestamp >= thresholdTimestamp) return true;

  if (isBeforeToday(reservation.date)) return true;
  if (isToday(reservation.date)) {
    const currDate = new Date();
    if (reservation.date.hour < currDate.getHours()) return true;
  }

  return false;
};

export { isExpiredReservation };

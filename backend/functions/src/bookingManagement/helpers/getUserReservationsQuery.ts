import {
  BookingType,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { getReservationsRef } from "./getReservationRef";

export const getUserReservationsQuery = (uid: string, type: BookingType) => {
  return getReservationsRef(type)
    .where("uid", "==", uid)
    .where("status", "==", ReservationStatus.active);
};

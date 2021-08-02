import {
  BookingReservationRequest,
  DropInReservationRequest,
} from "./reservationRequest";

export enum ReservationStatus {
  active = "active",
  expired = "expired",
  payed = "payed",
}

export type BookingReservationData = BookingReservationRequest & {
  timestamp: number;
};

export type DropInReservationData = DropInReservationRequest & {
  timestamp: number;
};

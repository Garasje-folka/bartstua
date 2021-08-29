import {
  FullSaunaReservationRequest,
  DropInReservationRequest,
} from "./reservationRequest";

export enum ReservationStatus {
  active = "active",
  expired = "expired",
  payed = "payed",
}

export type FullSaunaReservationData = FullSaunaReservationRequest & {
  timestamp: number;
};

export type DropInReservationData = DropInReservationRequest & {
  timestamp: number;
};

import { DateTime } from "../../dates/types";

export enum ReservationStatus {
  active = "active",
  expired = "expired",
  payed = "payed",
}

export type FullSaunaReservationData = {
  time: DateTime;
  timestamp: number;
  saunaId: string;
  duration: number;
  status: ReservationStatus;
  uid: string;
};

export type DropInReservationData = FullSaunaReservationData & {
  spaces: number;
};

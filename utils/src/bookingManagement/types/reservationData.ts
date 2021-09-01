import { DateTime } from "../../dates/types";

export enum ReservationStatus {
  active = "active",
  expired = "expired",
  payed = "payed",
}

// TODO: Might not need duration field, but it will probably make
//       frontend code simpler and reduce firestore queries
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

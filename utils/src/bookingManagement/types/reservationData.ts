import {
  BookingType,
  ReservationRequest,
  reservationRequestSchema,
  BookingReservationRequest,
  DropInReservationRequest,
} from "./reservationRequest";
import * as yup from "yup";

export enum ReservationStatus {
  active = "active",
  expired = "expired",
  payed = "payed",
}

export const reservationDataSchema = reservationRequestSchema.shape({
  timestamp: yup.number().required(),
});

export type ReservationData = ReservationRequest & {
  timestamp: number;
};

export type Reservation = {
  type: BookingType;
  timestamp: number;
  data: BookingReservationData | DropInReservationData;
};

export type BookingReservationData = BookingReservationRequest & {
  timestamp: number;
};

export type DropInReservationData = DropInReservationRequest & {
  timestamp: number;
};

import * as yup from "yup";
import { reservationDataSchema, ReservationData } from "./reservationData";

export const bookingDataSchema = reservationDataSchema.shape({
  uid: yup.string().required(),
});

export type BookingData = ReservationData & {
  uid: string;
};

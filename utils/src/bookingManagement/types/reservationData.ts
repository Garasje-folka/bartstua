import {
  ReservationRequest,
  reservationRequestSchema,
} from "./reservationRequest";
import * as yup from "yup";

export const reservationDataSchema = reservationRequestSchema.shape({
  timestamp: yup.number().required(),
});

export type ReservationData = ReservationRequest & {
  timestamp: number;
};

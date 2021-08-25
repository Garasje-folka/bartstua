import { DateTime, dateTimeSchema } from "../../dates/types";
import * as yup from "yup";
import { MAX_DROP_IN_SPACES } from "../constants";

export enum BookingType {
  booking = "booking",
  dropIn = "drop-in",
}

export enum EventLocation {
  loation1 = "location1",
}

export const bookingReservationRequestSchema = yup.object({
  time: dateTimeSchema.required(),
  location: yup
    .mixed<EventLocation>()
    .oneOf(Object.values(EventLocation))
    .required(),
});

export type BookingReservationRequest = {
  time: DateTime;
  location: EventLocation;
};

export const dropInReservationDataSchema =
  bookingReservationRequestSchema.shape({
    spaces: yup.number().min(1).max(MAX_DROP_IN_SPACES).required(),
  });

export type DropInReservationRequest = BookingReservationRequest & {
  spaces: number;
};

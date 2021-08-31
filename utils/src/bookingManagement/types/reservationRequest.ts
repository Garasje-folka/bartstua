import { DateTime, dateTimeSchema } from "../../dates/types";
import * as yup from "yup";
import { MAX_DROP_IN_SPACES } from "../constants";

export enum BookingType {
  fullSauna = "full-sauna",
  dropIn = "drop-in",
}

export enum EventLocation {
  loation1 = "location1",
}

export const fullSaunaReservationRequestSchema = yup.object({
  time: dateTimeSchema.required(),
  location: yup
    .mixed<EventLocation>()
    .oneOf(Object.values(EventLocation))
    .required(),
});

export type FullSaunaReservationRequest = {
  time: DateTime;
  location: EventLocation;
};

export const dropInReservationDataSchema =
  fullSaunaReservationRequestSchema.shape({
    spaces: yup.number().min(1).max(MAX_DROP_IN_SPACES).required(),
  });

export type DropInReservationRequest = FullSaunaReservationRequest & {
  spaces: number;
};

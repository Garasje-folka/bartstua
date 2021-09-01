import { DateTime, dateTimeSchema } from "../../dates/types";
import * as yup from "yup";
import { MAX_DROP_IN_SPACES } from "../constants";

export enum BookingType {
  fullSauna = "full-sauna",
  dropIn = "drop-in",
}

export const fullSaunaReservationRequestSchema = yup.object({
  time: dateTimeSchema.required(),
  saunaId: yup.string().required(),
});

export type FullSaunaReservationRequest = {
  time: DateTime;
  saunaId: string;
};

export const dropInReservationDataSchema =
  fullSaunaReservationRequestSchema.shape({
    spaces: yup.number().min(1).max(MAX_DROP_IN_SPACES).required(),
  });

export type DropInReservationRequest = FullSaunaReservationRequest & {
  spaces: number;
};

import { DateTime, dateTimeSchema } from "../../dates/types";
import * as yup from "yup";

export enum BookingType {
  fullSauna = "full-sauna",
  dropIn = "drop-in",
}

export const fullSaunaReservationRequestSchema = yup.object({
  saunaId: yup.string().required(),
  reservations: yup
    .array()
    .of(
      yup.object({
        time: dateTimeSchema.required(),
      })
    )
    .required(),
});

export type FullSaunaReservationRequest = {
  saunaId: string;
  reservations: {
    time: DateTime;
  }[];
};

export const dropInReservationRequestSchema =
  fullSaunaReservationRequestSchema.shape({
    reservations: yup
      .array()
      .of(yup.object({ spaces: yup.number().min(1).required() }))
      .required(),
  });

export type DropInReservationRequest = {
  saunaId: string;
  reservations: {
    time: DateTime;
    spaces: number;
  }[];
};

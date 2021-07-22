import { DateHour, dateHourSchema } from "../../dates/types";
import * as yup from "yup";
import { MAX_EVENT_SPACES } from "../constants";

export const reservationRequestSchema = yup.object({
  date: dateHourSchema,
  spaces: yup.number().min(1).max(MAX_EVENT_SPACES).required(),
});

export type ReservationRequest = {
  date: DateHour;
  spaces: number;
};

import { DateHour, dateHourSchema } from "./dateHour";
import * as yup from "yup";
import { MAX_EVENT_SPACES } from "./constants";

export const bookingRequestSchema = yup.object({
  date: dateHourSchema,
  spaces: yup.number().min(1).max(MAX_EVENT_SPACES).required(),
});

export const bookingDataSchema = bookingRequestSchema.shape({
  date: dateHourSchema,
  spaces: yup.number().min(1).max(MAX_EVENT_SPACES).required(),
  uid: yup.string().required(),
  paymentid: yup.string().required(),
});

export type BookingRequest = yup.InferType<typeof bookingRequestSchema>;
export type BookingData = yup.InferType<typeof bookingDataSchema>;

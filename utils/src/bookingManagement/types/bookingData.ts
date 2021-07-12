import { DateHour, dateHourSchema } from "../../dates/types";
import * as yup from "yup";
import { MAX_EVENT_SPACES } from "../constants";

export const bookingRequestSchema = yup.object({
  date: dateHourSchema,
  spaces: yup.number().min(1).max(MAX_EVENT_SPACES).required(),
});

export const bookingDataSchema = bookingRequestSchema.shape({
  uid: yup.string().required(),
});

export type BookingRequest = {
  date: DateHour;
  spaces: number;
};

export type BookingData = BookingRequest & {
  uid: string;
};

import { DateHour, dateHourSchema } from "./dateHour";
import * as yup from "yup";
import { MAX_EVENT_SPACES } from "./constants";

// TODO: Don't know if this is the correct way to do nested schemas
export const bookingDataSchema = yup.object({
  date: dateHourSchema.required(),
  spaces: yup.number().min(1).max(MAX_EVENT_SPACES).required(),
  uid: yup.string().required(),
});

export type BookingData = {
  date: DateHour;
  spaces: number;
  uid: string;
};

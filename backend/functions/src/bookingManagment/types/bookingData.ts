import { DateHour, dateHourSchema } from "./dateHour";
import * as yup from "yup";

// TODO: Don't know if this is the correct way to do nested schemas
export const bookingDataSchema = yup.object({
  date: dateHourSchema.required(),
  spaces: yup.number().required(),
  uid: yup.string().required(),
});

export type BookingData = {
  date: DateHour;
  spaces: number;
  uid: string;
};

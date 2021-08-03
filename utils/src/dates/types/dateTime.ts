import { dateHourSchema } from "./dateHour";
import * as yup from "yup";

export const dateTimeSchema = dateHourSchema.shape({
  minute: yup.number().min(0).max(59).required(),
});

export type DateTime = yup.InferType<typeof dateTimeSchema>;

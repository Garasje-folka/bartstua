import * as yup from "yup";

export const dateDaySchema = yup.object({
  year: yup.number().required(),
  month: yup.number().min(1).max(12).required(),
  day: yup.number().min(1).max(31).required(),
});

export type DateDay = yup.InferType<typeof dateDaySchema>;

export const duplicateDateDay = (oldDateDay: DateDay): DateDay => ({
  ...oldDateDay,
});

import * as yup from "yup";

export const dateDaySchema = yup.object({
  year: yup.number().required(),
  month: yup.number().required(),
  day: yup.number().required(),
});

export type DateDay = yup.InferType<typeof dateDaySchema>;

export const duplicateDateDay = (oldDateDay: DateDay): DateDay => ({
  ...oldDateDay,
});

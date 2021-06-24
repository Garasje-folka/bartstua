export interface DateDay {
  year: number;
  month: number;
  day: number;
}

export const duplicateDateDay = (oldDateDay: DateDay): DateDay => ({
  ...oldDateDay,
});

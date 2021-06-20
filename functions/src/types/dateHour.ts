import { DateDay } from "./dateDay";

export interface DateHour extends DateDay {
  hour: number;
}

export const duplicateDateHour = (oldDateHour: DateHour): DateHour => ({
  ...oldDateHour,
});

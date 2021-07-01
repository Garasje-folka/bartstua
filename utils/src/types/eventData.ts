import { DateHour, dateHourSchema, duplicateDateHour } from "./dateHour";
import * as yup from "yup";

export const eventDataSchema = yup.object({
  spacesTaken: yup.number().required(),
  date: dateHourSchema.required(),
});

export type EventData = {
  spacesTaken: number;
  date: DateHour;
};

export const initialEventData = (dateHour: DateHour): EventData => {
  return {
    date: dateHour,
    spacesTaken: 0,
  };
};

export const duplicateEventData = (oldEventData: EventData): EventData => ({
  ...oldEventData,
  date: duplicateDateHour(oldEventData.date),
});

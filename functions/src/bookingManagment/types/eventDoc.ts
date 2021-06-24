import { DateHour, duplicateDateHour } from "./dateHour";

export interface EventData {
  spacesTaken: number;
  date: DateHour;
}

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

import { DateDay, duplicateDateDay } from "./dateDay";

export interface EventData {
  spacesTakenByHours: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  date: DateDay;
}

export const initialEventData = (dateDay: DateDay): EventData => {
  return {
    date: dateDay,
    spacesTakenByHours: [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ],
  };
};

export const duplicateEventData = (oldEventData: EventData): EventData => ({
  date: duplicateDateDay(oldEventData.date),
  spacesTakenByHours: { ...oldEventData.spacesTakenByHours },
});

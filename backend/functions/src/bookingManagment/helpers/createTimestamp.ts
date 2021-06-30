import { createDateHourFromDate } from "./createDateHour";

const createTimestamp = (date: Date) => {
  return {
    ...createDateHourFromDate(date),
    minute: date.getMinutes(),
  };
};

export default createTimestamp;

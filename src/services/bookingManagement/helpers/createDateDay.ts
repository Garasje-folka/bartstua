import { DateDay } from "../../../shared/bookingManagement/types";

const createDateDayFromDate = (date: Date): DateDay => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1, // NOTE: getMonth() starts at 0, not 1
    day: date.getDate(),
  };
};

export default createDateDayFromDate;

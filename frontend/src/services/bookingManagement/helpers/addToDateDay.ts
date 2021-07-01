import { DateDay } from "utils";
import createDateDayFromDate from "./createDateDay";
import createDateFromDateDay from "./createDateFromDateDay";

// TODO: There might be a possible error for daylight saving days
const addToDateDay = (dateDay: DateDay, daysToAdd: number): DateDay => {
  const tempDate = createDateFromDateDay(dateDay);

  tempDate.setDate(tempDate.getDate() + daysToAdd);

  return createDateDayFromDate(tempDate);
};

export default addToDateDay;

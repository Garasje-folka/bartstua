import { DateDay } from "bartstua-shared";

const createDateFromDateDay = (dateDay: DateDay) => {
  const date = new Date(dateDay.year, dateDay.month - 1, dateDay.day);
  return date;
};

export default createDateFromDateDay;

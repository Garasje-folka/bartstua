import { DateDay } from "../types";

const isBeforeToday = (dateDay: DateDay) => {
  const currentDate = new Date();

  if (currentDate.getFullYear() !== dateDay.year) {
    return currentDate.getFullYear() > dateDay.year;
  }

  if (currentDate.getMonth() + 1 !== dateDay.month) {
    return currentDate.getMonth() + 1 > dateDay.month;
  }

  return currentDate.getDate() > dateDay.day;
};

export { isBeforeToday };

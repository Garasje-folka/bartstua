import { DateDay, DateHour } from "../interfaces";

const isToday = (date: DateDay | DateHour) => {
  let currentDate = new Date();
  return (
    date.year === currentDate.getFullYear() &&
    date.month === currentDate.getMonth() + 1 &&
    date.day === currentDate.getDate()
  );
};

export { isToday };

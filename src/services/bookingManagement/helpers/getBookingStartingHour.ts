import { FIRST_SESSION_TIME } from "../constants";
import { isToday } from "./isToday";

// Returns the first hour that can be booked for the given date

// TODO: Should propably refactor this to return the first valid date instead of hour.
// Bug if input date is later than the last valid booking hour

const getBookingStartingHour = (date: Date) => {
  if (isToday(date)) {
    console.log("today!");
    if (date.getHours() > FIRST_SESSION_TIME) return date.getHours();
  }

  return FIRST_SESSION_TIME;
};

export default getBookingStartingHour;

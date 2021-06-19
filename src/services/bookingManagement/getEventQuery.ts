import { firestore } from "../fireConfig";
import { EVENTS } from "./constants";
import { DateHour } from "./interfaces";

const getEventQuery = (date: DateHour) => {
  return firestore
    .collection(EVENTS)
    .where("year", "==", date.year)
    .where("month", "==", date.month)
    .where("day", "==", date.day)
    .where("hour", "==", date.hour)
    .limit(1);
};

export { getEventQuery };

import { firestore } from "../fireConfig";
import { EVENTS } from "./constants";
import { getEventId } from "./getEventId";
import { DateHour } from "./interfaces";

// TODO: Add error handling

const getEvent = (date: DateHour) => {
  const eventId = getEventId(date);
  return firestore.collection(EVENTS).doc(eventId).get();
};

export { getEvent };

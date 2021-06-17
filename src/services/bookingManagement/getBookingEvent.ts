import { firestore } from "../fireConfig";
import { EVENTS } from "./constants";
import { getBookingEventId } from "./getBookingEventId";
import { DateHour } from "./interfaces";

// TODO: Add error handling

const getBookingEvent = (date: DateHour) => {
  const eventId = getBookingEventId(date);
  return firestore.collection(EVENTS).doc(eventId).get();
};

export { getBookingEvent };

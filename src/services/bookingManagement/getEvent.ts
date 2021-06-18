import { firestore } from "../fireConfig";
import { EVENTS } from "./constants";
import { getEventId } from "./getEventId";
import { DateHour, EventDoc } from "./interfaces";

// TODO: Add error handling

const getEvent = (date: DateHour) => {
  const eventId = getEventId(date);
  return firestore.collection(EVENTS).doc(eventId).get();
};

const subscribeEvent = (
  date: DateHour,
  callback: (event: EventDoc | undefined) => void
) => {
  const eventId = getEventId(date);
  const unsubscribe = firestore
    .collection(EVENTS)
    .doc(eventId)
    .onSnapshot((snapshot) => {
      const data = snapshot.data();
      const event = data ? (data as EventDoc) : undefined;
      callback(event);
    });
  return () => {
    unsubscribe();
  };
};

export { getEvent, subscribeEvent };

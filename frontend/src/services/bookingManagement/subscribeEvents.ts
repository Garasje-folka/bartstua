import { DateDay, EventData } from "../../../../utils/dist";
import firebase, { firestore } from "../fireConfig";
import {
  BOOKING_ENDING_TIME,
  BOOKING_STARTING_TIME,
  EVENTS,
  MAX_EVENT_SPACES,
} from "./constants";

const getEventsQueryRef = (date: DateDay) => {
  return firestore
    .collection(EVENTS)
    .where("date.year", "==", date.year)
    .where("date.month", "==", date.month)
    .where("date.day", "==", date.day);
};

const mapQuerySnapshot = (
  dateDay: DateDay,
  minSpaces: number,
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const queryEvents = querySnapshot.docs.map((doc) => doc.data() as EventData);

  // Sort by time ascending
  queryEvents.sort((e1, e2) => e2.date.hour - e1.date.hour);

  const result: EventData[] = [];

  let hour: number = BOOKING_STARTING_TIME;

  while (hour < BOOKING_ENDING_TIME) {
    const queryEvent = queryEvents.shift();
    const queryEventHour = queryEvent
      ? queryEvent.date.hour
      : BOOKING_ENDING_TIME;

    while (hour < queryEventHour) {
      result.push({
        spacesTaken: 0,
        date: {
          ...dateDay,
          hour: hour,
        },
      });

      hour++;
    }

    if (queryEvent) {
      if (MAX_EVENT_SPACES - queryEvent.spacesTaken >= minSpaces) {
        result.push(queryEvent);
      }
    }

    hour++;
  }

  return result;
};

const subscribeEvents = (
  date: DateDay,
  minSpaces: number,
  callback: (event: EventData[]) => void
) => {
  const unsubscribe = getEventsQueryRef(date).onSnapshot((querySnapshot) => {
    const events = mapQuerySnapshot(date, minSpaces, querySnapshot);
    callback(events);
  });
  return () => {
    unsubscribe();
  };
};

export { subscribeEvents };

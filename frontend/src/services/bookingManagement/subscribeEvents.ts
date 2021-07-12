import { DateDay } from "utils/src/dates/types";
import { EventData } from "utils/src/bookingManagement/types";
import firebase, { firestore } from "../fireConfig";
import {
  BOOKING_ENDING_TIME,
  BOOKING_STARTING_TIME,
  EVENTS,
} from "utils/src/bookingManagement/constants";

const getEventsQueryRef = (date: DateDay) => {
  return firestore
    .collection(EVENTS)
    .where("date.year", "==", date.year)
    .where("date.month", "==", date.month)
    .where("date.day", "==", date.day);
};

const mapQuerySnapshot = (
  dateDay: DateDay,
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const queryEvents = querySnapshot.docs.map((doc) => doc.data() as EventData);

  // Sort by time ascending
  queryEvents.sort((e1, e2) => e1.date.hour - e2.date.hour);

  const result: EventData[] = [];

  let hour: number = BOOKING_STARTING_TIME;

  while (hour < BOOKING_ENDING_TIME) {
    let queryEvent = queryEvents.shift();

    const nextEventHour = queryEvent
      ? queryEvent.date.hour
      : BOOKING_ENDING_TIME;

    while (hour < nextEventHour) {
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
      result.push(queryEvent);
    }

    hour++;
  }

  return result;
};

const subscribeEvents = (
  date: DateDay,
  callback: (event: EventData[]) => void
) => {
  const unsubscribe = getEventsQueryRef(date).onSnapshot((querySnapshot) => {
    const events = mapQuerySnapshot(date, querySnapshot);
    callback(events);
  });
  return () => {
    unsubscribe();
  };
};

export { subscribeEvents };

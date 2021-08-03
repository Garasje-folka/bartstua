import { DateDay } from "utils/dist/dates/types";
import {
  BookingType,
  DropInEvent,
  EventLocation,
} from "utils/dist/bookingManagement/types";
import firebase, { firestore } from "../fireConfig";
import {
  BOOKING_ENDING_TIME,
  BOOKING_STARTING_TIME,
  EVENTS,
} from "utils/dist/bookingManagement/constants";
import { getEventCollectionName } from "utils/dist/bookingManagement/helpers";

const getEventsQueryRef = (date: DateDay, location: EventLocation) => {
  return firestore
    .collection(EVENTS)
    .doc(location)
    .collection(getEventCollectionName(BookingType.dropIn))
    .where("time.year", "==", date.year)
    .where("time.month", "==", date.month)
    .where("time.day", "==", date.day);
};

const mapQuerySnapshot = (
  dateDay: DateDay,
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const queryEvents = querySnapshot.docs.map(
    (doc) => doc.data() as DropInEvent
  );

  // Sort by time ascending
  queryEvents.sort((e1, e2) => e1.time.hour - e2.time.hour);

  const result: DropInEvent[] = [];

  let hour: number = BOOKING_STARTING_TIME;

  while (hour < BOOKING_ENDING_TIME) {
    let queryEvent = queryEvents.shift();

    const nextEventHour = queryEvent
      ? queryEvent.time.hour
      : BOOKING_ENDING_TIME;

    // Fill missing hours with empty events
    while (hour < nextEventHour) {
      result.push({
        spacesTaken: 0,
        time: {
          ...dateDay,
          hour: hour,
          minute: 0,
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

const subscribeDropInEvents = (
  date: DateDay,
  location: EventLocation,
  callback: (event: DropInEvent[]) => void
) => {
  const unsubscribe = getEventsQueryRef(date, location).onSnapshot(
    (querySnapshot) => {
      const events = mapQuerySnapshot(date, querySnapshot);
      callback(events);
    }
  );
  return () => {
    unsubscribe();
  };
};

export { subscribeDropInEvents as subscribeEvents };

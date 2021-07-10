import { DateDay, EventData } from "../../../../utils/dist";
import firebase, { firestore } from "../fireConfig";
import { createError } from "../userManagement/helpers/createError";
import {
  BOOKING_ENDING_TIME,
  BOOKING_STARTING_TIME,
  EVENTS,
  MAX_EVENT_SPACES,
} from "./constants";
import { getEventStartingHour } from "./getEventStartingHour";

// TODO: Requery every hour to remove outdated events (haryp2309)
const getEventsQueryRef = (date: DateDay, startHour: number) => {
  return firestore
    .collection(EVENTS)
    .where("date.year", "==", date.year)
    .where("date.month", "==", date.month)
    .where("date.day", "==", date.day)
    .where("date.hour", ">=", startHour);
};

const mapQuerySnapshot = (
  dateDay: DateDay,
  minSpaces: number,
  startHour: number,
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  const queryEvents = querySnapshot.docs.map((doc) => doc.data() as EventData);

  // Sort by time ascending
  queryEvents.sort((e1, e2) => e1.date.hour - e2.date.hour);
  console.log(queryEvents[0]);

  const result: EventData[] = [];

  let hour: number = startHour;

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
  const startHour = getEventStartingHour(date);
  if (!startHour) {
    // TODO: Add proper error handling, don't know if we should even throw error...
    throw createError("No events");
  }
  const unsubscribe = getEventsQueryRef(date, startHour).onSnapshot(
    (querySnapshot) => {
      const events = mapQuerySnapshot(
        date,
        minSpaces,
        startHour,
        querySnapshot
      );
      callback(events);
    }
  );
  return () => {
    unsubscribe();
  };
};

export { subscribeEvents };

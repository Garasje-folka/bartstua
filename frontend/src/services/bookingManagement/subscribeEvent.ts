import { DateHour } from "utils/dist/dates/types";
import { EventData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { EVENTS } from "utils/dist/bookingManagement/constants";
import firebase, { firestore } from "../fireConfig";
import { getEventId } from "utils/dist/bookingManagement/helpers";

const getEventRef = (date: DateHour) => {
  return firestore.collection(EVENTS).doc(getEventId(date));
};

const snapshotToEventDoc = (
  snapshot: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
) => {
  if (!snapshot.exists) return undefined;

  return {
    id: snapshot.id,
    data: snapshot.data() as EventData,
  } as Doc<EventData>;
};

const subscribeEvent = (
  date: DateHour,
  callback: (event: EventData | undefined) => void
) => {
  const unsubscribe = getEventRef(date).onSnapshot((snapshot) => {
    const event = snapshotToEventDoc(snapshot);
    callback(event?.data);
  });
  return () => {
    unsubscribe();
  };
};

export { subscribeEvent };

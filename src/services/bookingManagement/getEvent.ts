import { DateHour, DateDay, EventData, Doc } from "./types";
import { EVENTS } from "./constants";
import firebase, { firestore } from "../fireConfig";

// TODO: Add error handling

const getEventQueryRef = (date: DateDay) => {
  const filteredDate: DateDay = {
    day: date.day,
    month: date.month,
    year: date.year,
  };
  return firestore
    .collection(EVENTS)
    .where("date", "==", filteredDate)
    .limit(1);
};

const querySnapshotToEventDoc = (
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  if (querySnapshot.empty) return undefined;

  const doc = querySnapshot.docs[0];
  return {
    uid: doc.id,
    data: doc.data() as EventData,
  } as Doc<EventData>;
};

const getEvent = async (date: DateHour) => {
  const querySnapshot = await getEventQueryRef(date).get();
  return querySnapshotToEventDoc(querySnapshot);
};

const subscribeEvent = (
  date: DateHour,
  callback: (event: EventData | undefined) => void
) => {
  const unsubscribe = getEventQueryRef(date).onSnapshot((querySnapshot) => {
    const event = querySnapshotToEventDoc(querySnapshot);
    callback(event?.data);
  });
  return () => {
    unsubscribe();
  };
};

export { getEvent, subscribeEvent };

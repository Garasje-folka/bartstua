import { DateHour } from "utils/src/dates/types";
import { EventData } from "utils/src/bookingManagement/types";
import { Doc } from "utils/src/types";
import { EVENTS } from "utils/src/bookingManagement/constants";
import firebase, { firestore } from "../fireConfig";

// TODO: Add error handling

const getEventQueryRef = (date: DateHour) => {
  return firestore.collection(EVENTS).where("date", "==", date).limit(1);
};

const querySnapshotToEventDoc = (
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  if (querySnapshot.empty) return undefined;

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    data: doc.data() as EventData,
  } as Doc<EventData>;
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

export { subscribeEvent };

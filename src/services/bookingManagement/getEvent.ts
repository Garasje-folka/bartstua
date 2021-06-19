import { getEventQuery } from "./getEventQuery";
import { DateHour, EventDoc } from "./interfaces";
import firebase from "firebase";

// TODO: Add error handling

const querySnapshotToEventDoc = (
  querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
) => {
  if (querySnapshot.empty) return undefined;

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as EventDoc;
};

const getEvent = async (date: DateHour) => {
  const querySnapshot = await getEventQuery(date).get();
  return querySnapshotToEventDoc(querySnapshot);
};

const subscribeEvent = (
  date: DateHour,
  callback: (event: EventDoc | undefined) => void
) => {
  const unsubscribe = getEventQuery(date).onSnapshot((querySnapshot) => {
    const event = querySnapshotToEventDoc(querySnapshot);
    callback(event);
  });
  return () => {
    unsubscribe();
  };
};

export { getEvent, subscribeEvent };

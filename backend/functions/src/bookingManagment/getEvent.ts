import * as admin from "firebase-admin";
import {EVENTS} from "./constants";
import {DateHour, Doc, EventData} from "./types";

const getEventQueryRef = (date: DateHour) => {
  return admin
      .firestore()
      .collection(EVENTS)
      .where("date", "==", date)
      .limit(1);
};

const querySnapshotToEventDoc = (
    querySnapshot: FirebaseFirestore.QuerySnapshot<
        FirebaseFirestore.DocumentData>
) => {
  if (querySnapshot.empty) return undefined;

  const doc = querySnapshot.docs[0];
  return {
    id: doc.id,
    data: doc.data() as EventData,
  } as Doc<EventData>;
};

const getEvent = async (date: DateHour) => {
  const querySnapshot = await getEventQueryRef(date).get();
  return querySnapshotToEventDoc(querySnapshot);
};

export {getEvent};

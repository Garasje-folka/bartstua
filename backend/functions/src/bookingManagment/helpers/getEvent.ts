import * as admin from "firebase-admin";
import { EVENTS } from "utils/dist/bookingManagement/constants";
import { EventData } from "utils/dist/bookingManagement/types";
import { DateHour } from "utils/dist/dates/types";
import { Doc } from "utils/dist/types";

const getEventQueryRef = (date: DateHour) => {
  return admin
    .firestore()
    .collection(EVENTS)
    .where("date", "==", date)
    .limit(1);
};

const querySnapshotToEventDoc = (
  querySnapshot: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
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

export { getEvent };

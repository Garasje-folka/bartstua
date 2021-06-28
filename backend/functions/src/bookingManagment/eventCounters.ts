import * as admin from "firebase-admin";
/* import * as functions from "firebase-functions";
import { DateHour, EventData, initialEventData } from "./types";
import { EVENTS } from "./constants"; */

admin.initializeApp();
/* 
const dateHourToEventId = async (dateHour: DateHour) => {
  const docRef = admin.firestore().collection(EVENTS);
  const existingEventSnapshot = await docRef
    .where("date", "==", dateHour)
    .get();
  if (!existingEventSnapshot.empty) {
    return existingEventSnapshot.docs[0].id;
  }

  // Continues if event does not exist
  const eventData: EventData = initialEventData(dateHour);

  const newDocRef = await docRef.add(eventData);
  functions.logger.info(
    `Created a new event document with id "${newDocRef.id}"`
  );
  return newDocRef.id;
};

const regulateEventSpacesTaken = async (
  eventId: string,
  additionValue: number
) => {
  admin
    .firestore()
    .collection(EVENTS)
    .doc(eventId)
    .update({
      spacesTaken: admin.firestore.FieldValue.increment(additionValue),
    });
  functions.logger.info(
    `Spaces in ${eventId} is incremented with ${additionValue}`
  );
};

export const incrementSpacesTakenOnBookingCreate = functions.firestore
.document("/bookings/{booking}")
.onCreate(async (snapshot) => {
const bookingData = snapshot.data() as BookingData;
const eventId = await dateHourToEventId(bookingData.date);
await regulateEventSpacesTaken(eventId, bookingData.spaces);
});

export const decrementSpacesTakenOnBookingDelete = functions.firestore
.document("/bookings/{booking}")
.onDelete(async (snapshot) => {
const bookingData = snapshot.data() as BookingData;
const eventId = await dateHourToEventId(bookingData.date);
await regulateEventSpacesTaken(eventId, -bookingData.spaces);
});

export const adjustSpacesTakenOnBookingUpdate = functions.firestore
.document("/bookings/{booking}")
.onUpdate(async (change) => {
const oldBookingData = change.before.data() as BookingData;
const newBookingData = change.after.data() as BookingData;

const oldEventIdPromise = dateHourToEventId(oldBookingData.date);
const newEventIdPromise = dateHourToEventId(newBookingData.date);

const [oldEventId, newEventId] = await Promise.all([
oldEventIdPromise,
newEventIdPromise,
]);

admin.firestore().runTransaction(async (transaction) => {
const eventCollectionRef = admin.firestore().collection(EVENTS);

const oldEventRef = eventCollectionRef.doc(oldEventId);

transaction.update(oldEventRef, {
spacesTaken: admin.firestore.FieldValue.increment(
-oldBookingData.spaces
),
});

functions.logger.info(
`Spaces in ${oldEventId} is decremented with ${oldBookingData.spaces}`
);

const newEventRef = eventCollectionRef.doc(newEventId);

transaction.update(newEventRef, {
spacesTaken: admin.firestore.FieldValue.increment(
newBookingData.spaces
),
});

functions.logger.info(
`Spaces in ${newEventRef} is incremented with ${newBookingData.spaces}`
);
});
});
 */

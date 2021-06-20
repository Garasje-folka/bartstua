import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  BookingData,
  DateDay,
  DateHour,
  EventData,
  initialEventData,
} from "./types";

const EVENTS = "events";
admin.initializeApp();

const dateDayToEventId = async (dateDay: DateDay) => {
  const docRef = admin.firestore().collection(EVENTS);
  const existingEventSnapshot = await docRef.where("date", "==", dateDay).get();
  if (!existingEventSnapshot.empty) {
    return existingEventSnapshot.docs[0].id;
  }

  // Continues if event does not exist
  const eventData: EventData = initialEventData(dateDay);

  const newDocRef = await docRef.add(eventData);
  return newDocRef.id;
};

const regulateEventSpacesTaken = async (
  eventId: string,
  hourInDay: number,
  additionValue: number
) => {
  const eventDocRef = admin.firestore().collection(EVENTS).doc(eventId);

  await admin.firestore().runTransaction(async (transaction) => {
    const value = await transaction.get(eventDocRef);
    const eventData = value.data() as EventData;
    const newSpacesTaken = [...eventData.spacesTakenByHours];
    newSpacesTaken[hourInDay] += additionValue;
    transaction.update(eventDocRef, {
      spacesTakenByHours: newSpacesTaken,
    });
    functions.logger.info(
      `Spaces in ${eventId} is updated from ${eventData.spacesTakenByHours} to ${newSpacesTaken}`
    );
  });
};

const dateHourToDateDay = (dateHour: DateHour): DateDay => ({
  day: dateHour.day,
  month: dateHour.month,
  year: dateHour.year,
});

export const incrementSpacesTakenOnBookingCreate = functions.firestore
  .document("/bookings/{booking}")
  .onCreate(async (snapshot) => {
    const bookingData: BookingData = snapshot.data() as BookingData;
    const eventId = await dateDayToEventId(dateHourToDateDay(bookingData.date));
    regulateEventSpacesTaken(
      eventId,
      bookingData.date.hour,
      bookingData.spaces
    );
  });

export const decrementSpacesTakenOnBookingDelete = functions.firestore
  .document("/bookings/{booking}")
  .onDelete(async (snapshot) => {
    const bookingData: BookingData = snapshot.data() as BookingData;
    const eventId = await dateDayToEventId(dateHourToDateDay(bookingData.date));
    regulateEventSpacesTaken(
      eventId,
      bookingData.date.hour,
      -bookingData.spaces
    );
  });

export const adjustSpacesTakenOnBookingUpdate = functions.firestore
  .document("/bookings/{booking}")
  .onUpdate(async (change) => {
    const oldBookingData = change.before.data() as BookingData;
    const newBookingData = change.after.data() as BookingData;

    const oldEventId = await dateDayToEventId(
      dateHourToDateDay(oldBookingData.date)
    );
    const newEventId = await dateDayToEventId(
      dateHourToDateDay(newBookingData.date)
    );

    regulateEventSpacesTaken(
      oldEventId,
      oldBookingData.date.hour,
      -oldBookingData.spaces
    );
    regulateEventSpacesTaken(
      newEventId,
      newBookingData.date.hour,
      newBookingData.spaces
    );
  });

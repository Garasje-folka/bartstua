import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  BookingData,
  DateDay,
  DateHour,
  duplicateEventData,
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
  functions.logger.info(
    `Created a new event document with id "${newDocRef.id}"`
  );
  return newDocRef.id;
};

const getEventData = async (
  eventId: string,
  transaction: FirebaseFirestore.Transaction
) => {
  const eventDocRef = admin.firestore().collection(EVENTS).doc(eventId);
  const value = await transaction.get(eventDocRef);
  const eventData = value.data() as EventData;
  return eventData;
};

const updateSpacesTaken = async (
  eventId: string,
  previousEventData: EventData,
  updatedEventData: EventData,
  transaction: FirebaseFirestore.Transaction
) => {
  const eventDocRef = admin.firestore().collection(EVENTS).doc(eventId);

  transaction.update(eventDocRef, {
    spacesTakenByHours: updatedEventData.spacesTakenByHours,
  });
  functions.logger.info(
    `Spaces in ${eventId} is updated from ${previousEventData.spacesTakenByHours} to ${updatedEventData.spacesTakenByHours}`
  );
};

const regulateEventSpacesTaken = async (
  eventId: string,
  hourInDay: number,
  additionValue: number
) => {
  admin.firestore().runTransaction(async (transaction) => {
    const previousEventData: EventData = await getEventData(
      eventId,
      transaction
    );
    const updatedEventData: EventData = duplicateEventData(previousEventData);
    updatedEventData.spacesTakenByHours[hourInDay] += additionValue;

    updateSpacesTaken(
      eventId,
      previousEventData,
      updatedEventData,
      transaction
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
    await regulateEventSpacesTaken(
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
    await regulateEventSpacesTaken(
      eventId,
      bookingData.date.hour,
      -bookingData.spaces
    );
  });

export const adjustSpacesTakenOnBookingUpdate = functions.firestore
  .document("/bookings/{booking}")
  .onUpdate(async (change) => {
    const previousBookingData = change.before.data() as BookingData;
    const updatedBookingData = change.after.data() as BookingData;

    const previousEventIdPromise = dateDayToEventId(
      dateHourToDateDay(previousBookingData.date)
    );
    const updatedEventIdPromise = dateDayToEventId(
      dateHourToDateDay(updatedBookingData.date)
    );

    const [previousEventId, updatedEventId] = await Promise.all([
      previousEventIdPromise,
      updatedEventIdPromise,
    ]);

    admin.firestore().runTransaction(async (transaction) => {
      if (previousEventId === updatedEventId) {
        // If same event-document, prevents dirty read
        const previousEventData = await getEventData(
          previousEventId,
          transaction
        );
        const updatedEventData = duplicateEventData(previousEventData);
        updatedEventData.spacesTakenByHours[previousBookingData.date.hour] -=
          previousBookingData.spaces;
        updatedEventData.spacesTakenByHours[updatedBookingData.date.hour] +=
          updatedBookingData.spaces;

        await updateSpacesTaken(
          previousEventId,
          previousEventData,
          updatedEventData,
          transaction
        );
      } else {
        // Removing counts from old eventData for the booking
        const previousOldEventData = await getEventData(
          previousEventId,
          transaction
        );
        const previousNewEventData = duplicateEventData(previousOldEventData);
        previousNewEventData.spacesTakenByHours[
          previousBookingData.date.hour
        ] -= previousBookingData.spaces;

        // Adding counts to new eventData for the booking
        const updatedOldEventData = await getEventData(
          updatedEventId,
          transaction
        );
        const updatedNewEventData = duplicateEventData(updatedOldEventData);
        updatedNewEventData.spacesTakenByHours[updatedBookingData.date.hour] +=
          updatedBookingData.spaces;

        // Executes update on both old and new eventData
        await updateSpacesTaken(
          previousEventId,
          previousOldEventData,
          previousNewEventData,
          transaction
        );
        updateSpacesTaken(
          updatedEventId,
          updatedOldEventData,
          updatedNewEventData,
          transaction
        );
      }
    });
  });

import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";
import { RESERVATION_CLEARING_INTERVAL } from "./bookingManagement/constants";
import { addToDateDay, createDateDayFromDate } from "utils/dist/dates/helpers";
import {
  BOOKING_ENDING_TIME,
  BOOKING_STARTING_TIME,
} from "utils/dist/bookingManagement/constants";
import { BookingType, EventLocation } from "utils/dist/bookingManagement/types";
import {
  getEventCollectionName,
  getEventId,
} from "utils/dist/bookingManagement/helpers";
admin.initializeApp();

// Fill next two months with events
// TODO: Hardcoding location and event duration for know,
//       fix later
const startDate = createDateDayFromDate(new Date());
let batch = admin.firestore().batch();
let writes = 0;
for (let i = 0; i <= 60; i++) {
  const d = addToDateDay(startDate, i);

  // Drop-In events
  for (let h = BOOKING_STARTING_TIME; h < BOOKING_ENDING_TIME; h++) {
    const time = {
      ...d,
      hour: h,
      minute: 0,
    };
    const docId = getEventId(time);
    const ref = admin
      .firestore()
      .collection("locations")
      .doc(EventLocation.loation1)
      .collection(getEventCollectionName(BookingType.dropIn))
      .doc(docId);

    batch.create(ref, {
      spacesTaken: 0,
      time: time,
    });

    writes++;
    if (writes === 500) {
      batch.commit();
      batch = admin.firestore().batch();
      writes = 0;
    }
  }

  // Booking events
  for (let h = BOOKING_STARTING_TIME; h < BOOKING_ENDING_TIME; h += 2) {
    const time = {
      ...d,
      hour: h,
      minute: 0,
    };
    const docId = getEventId(time);
    const ref = admin
      .firestore()
      .collection("locations")
      .doc(EventLocation.loation1)
      .collection(getEventCollectionName(BookingType.booking))
      .doc(docId);

    batch.create(ref, {
      taken: false,
      time: time,
    });

    writes++;
    if (writes === 500) {
      batch.commit();
      batch = admin.firestore().batch();
      writes = 0;
    }
  }
}
if (writes > 0) batch.commit();

if (process.env.FUNCTIONS_EMULATOR) {
  const pubsub = new PubSub({
    apiEndpoint: "localhost:8085",
  });

  setInterval(() => {
    const SCHEDULED_FUNCTION_TOPIC =
      "firebase-schedule-clearExpiredReservations";
    pubsub.topic(SCHEDULED_FUNCTION_TOPIC).publishJSON({});
  }, RESERVATION_CLEARING_INTERVAL * 60 * 1000);
}

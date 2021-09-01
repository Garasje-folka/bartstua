import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";
import { RESERVATION_CLEARING_INTERVAL } from "./bookingManagement/constants";
import {
  addToDateDay,
  createDateDayFromDate,
  createDateFromDateDay,
} from "utils/dist/dates/helpers";
import {
  BookingType,
  DropInEvent,
  FullSaunaEvent,
  SaunaData,
} from "utils/dist/bookingManagement/types";
import {
  getEventCollectionName,
  getEventId,
} from "utils/dist/bookingManagement/helpers";
import { Doc } from "utils/dist/types";
import { SAUNAS } from "utils/dist/bookingManagement/constants";

admin.initializeApp();

// Fill next two months with events
// TODO: Hardcoding sauna schedule for know,
//       should rather be fetched from the
//       sauna docs
const initializeEvents = async (
  saunaDocs: Doc<SaunaData>[],
  numberOfDays: number
) => {
  const batchSize = 500;
  const startDate = createDateDayFromDate(new Date());
  let batch = admin.firestore().batch();
  let writes = 0;

  for (const saunaDoc of saunaDocs) {
    const dropInSchedule = saunaDoc.data.dropInSchedule;
    const wholeSaunaSchedule = saunaDoc.data.wholeSaunaSchedule;

    for (let i = 0; i < numberOfDays; i++) {
      const dateDay = addToDateDay(startDate, i);
      const weekDay = createDateFromDateDay(dateDay).getDay();

      // Drop-In events
      if (
        !dropInSchedule.weekdays ||
        dropInSchedule.weekdays.includes(weekDay)
      ) {
        let minuteSum = dropInSchedule.startMinute;

        while (
          minuteSum + dropInSchedule.frequency <=
          dropInSchedule.endMinute
        ) {
          const hour = Math.floor(minuteSum / 60);
          const minute = minuteSum % 60;

          const time = {
            ...dateDay,
            hour: hour,
            minute: minute,
          };

          const docId = getEventId(time);
          const ref = admin
            .firestore()
            .collection(SAUNAS)
            .doc(saunaDoc.id)
            .collection(getEventCollectionName(BookingType.dropIn))
            .doc(docId);

          const dropInEvent = {
            spacesTaken: 0,
            time: time,
            duration: saunaDoc.data.dropInSchedule.duration,
          } as DropInEvent;

          batch.create(ref, dropInEvent);

          writes++;
          if (writes === batchSize) {
            await batch.commit();
            batch = admin.firestore().batch();
            writes = 0;
          }

          minuteSum += dropInSchedule.frequency;
        }
      }

      if (
        !wholeSaunaSchedule.weekdays ||
        wholeSaunaSchedule.weekdays.includes(weekDay)
      ) {
        // Whole sauna events
        let minuteSum = wholeSaunaSchedule.startMinute;

        while (
          minuteSum + wholeSaunaSchedule.frequency <=
          dropInSchedule.endMinute
        ) {
          const hour = Math.floor(minuteSum / 60);
          const minute = minuteSum % 60;

          const time = {
            ...dateDay,
            hour: hour,
            minute: minute,
          };
          const docId = getEventId(time);
          const ref = admin
            .firestore()
            .collection(SAUNAS)
            .doc(saunaDoc.id)
            .collection(getEventCollectionName(BookingType.fullSauna))
            .doc(docId);

          const fullSaunaEvent = {
            taken: false,
            time: time,
            duration: saunaDoc.data.wholeSaunaSchedule.duration,
          } as FullSaunaEvent;

          batch.create(ref, fullSaunaEvent);

          writes++;
          if (writes === batchSize) {
            await batch.commit();
            batch = admin.firestore().batch();
            writes = 0;
          }

          minuteSum += wholeSaunaSchedule.frequency;
        }
      }
    }
  }
  if (writes > 0) await batch.commit();
};

const initializeSaunas = async () => {
  const saunaData = {
    name: "Bunker'n",
    description:
      "Etter å ha jobbet en hel sommer har vi fått restaurert en" +
      "badstu som har ligget ubrukt i Trondheim i all for lang tid." +
      "Bunker´n er vårt nyeste prosjekt og noe vi er stolte av å ha fått til.",
    capacity: 8,
    dropInPrice: 199,
    wholeSaunaPrice: 899,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/bartstua.appspot.com/o/public%2FBunkerSauna.jpg?alt=media",
    dropInSchedule: {
      weekdays: [6],
      startMinute: 8 * 60,
      endMinute: 20 * 60,
      duration: 60,
      frequency: 60,
    },
    wholeSaunaSchedule: {
      weekdays: [0, 1, 2, 3, 4, 5],
      startMinute: 7 * 60,
      endMinute: 21 * 60,
      duration: 180,
      frequency: 180,
    },
  } as SaunaData;

  const docRef = admin.firestore().collection(SAUNAS).doc();
  await docRef.create(saunaData);

  const saunaDoc = {
    id: docRef.id,
    data: saunaData,
  } as Doc<SaunaData>;

  return [saunaDoc];
};

if (process.env.FUNCTIONS_EMULATOR) {
  const ref = admin.firestore().collection("debug-dev").doc("isInitialized");

  const existingDoc = ref.get();
  existingDoc.then(({ exists }) => {
    if (!exists) {
      // First time running cloud functions

      initializeSaunas()
        .then((saunaIds) => initializeEvents(saunaIds, 60))
        .catch((error) => {
          console.log(error);
        });

      const pubsub = new PubSub({
        apiEndpoint: "localhost:8085",
      });

      setInterval(() => {
        const SCHEDULED_FUNCTION_TOPIC =
          "firebase-schedule-clearExpiredReservations";
        pubsub.topic(SCHEDULED_FUNCTION_TOPIC).publishJSON({});
      }, RESERVATION_CLEARING_INTERVAL * 60 * 1000);

      ref.create({
        initialized: true,
      });
    }
  });
}

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import {
  BookingType,
  DropInReservationData,
  dropInReservationDataSchema,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  createTimestamp,
  getReservationCollectionName,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";
import { getEventRef, getUserReservationsRef } from "./helpers";
import {
  MAX_DROP_IN_SPACES,
  RESERVATIONS,
} from "utils/dist/bookingManagement/constants";
import { USERS } from "utils/dist/userManagement/constants";

const dataSchema = yup.object({
  requests: yup.array().of(dropInReservationDataSchema).required(),
});

export const addDropInReservations = functions.https.onCall(
  async (data, context) => {
    if (!(await checkData(data, dataSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    const requests = data.requests as DropInReservationData[];

    // Information that has to be passed from the reading part of the transaction
    // to the writing part of the transaction
    const eventExistsMap = new Map<string, boolean>();

    await admin.firestore().runTransaction(async (transaction) => {
      for (const request of requests) {
        if (!isValidEventTime(request.time)) {
          throw new functions.https.HttpsError(
            "invalid-argument",
            "invalid-time"
          );
        }

        const eventTimeString = JSON.stringify(request.time);

        if (eventExistsMap.has(eventTimeString)) {
          // Having this restriction because it makes the implementaion much easier
          throw new functions.https.HttpsError(
            "invalid-argument",
            "duplicate-requests"
          );
        } else {
          const eventRef = getEventRef(
            request.location,
            BookingType.dropIn,
            request.time
          );
          const eventSnapshot = await transaction.get(eventRef);

          let spacesTaken = 0;
          if (eventSnapshot.exists) {
            spacesTaken = eventSnapshot.get("spacesTaken");
          }

          if (spacesTaken + request.spaces > MAX_DROP_IN_SPACES) {
            throw new functions.https.HttpsError(
              "failed-precondition",
              "not-enough-space"
            );
          }
          eventExistsMap.set(eventTimeString, eventSnapshot.exists);
        }
      }

      for (const request of requests) {
        const eventTimeString = JSON.stringify(request.time);
        const eventExists = !!eventExistsMap.get(eventTimeString);

        const eventRef = getEventRef(
          request.location,
          BookingType.booking,
          request.time
        );

        const timestamp = createTimestamp(0);
        const reservationRef = admin
          .firestore()
          .collection(RESERVATIONS)
          .doc(request.location)
          .collection(getReservationCollectionName(BookingType.booking))
          .doc();

        transaction.set(reservationRef, {
          time: request.time,
          uid: auth.uid,
          timestamp: timestamp,
          status: ReservationStatus.active,
          spaces: request.spaces,
        });

        const userReservationRef = getUserReservationsRef(
          auth.uid,
          BookingType.dropIn
        ).doc(reservationRef.id);

        transaction.set(userReservationRef, {
          ...request,
          timestamp: timestamp,
        });

        if (eventExists) {
          transaction.update(eventRef, {
            spacesTaken: admin.firestore.FieldValue.increment(request.spaces),
          });
        } else {
          transaction.set(eventRef, {
            time: request.time,
            spacesTaken: request.spaces,
          });
        }
      }
    });
  }
);

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as yup from "yup";
import {
  BookingReservationData,
  bookingReservationRequestSchema,
  BookingType,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  createTimestamp,
  getReservationCollectionName,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";
import { getEventRef, getUserReservationsRef } from "./helpers";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";

const dataSchema = yup.object({
  requests: yup.array().of(bookingReservationRequestSchema).required(),
});

export const addBookingReservations = functions.https.onCall(
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

    const requests = data.requests as BookingReservationData[];

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
            BookingType.booking,
            request.time
          );
          const eventSnapshot = await transaction.get(eventRef);

          let eventTaken = false;
          if (eventSnapshot.exists) {
            eventTaken = eventSnapshot.get("taken");
          }

          if (eventTaken) {
            throw new functions.https.HttpsError(
              "failed-precondition",
              "event-taken"
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
        });

        const userReservationRef = getUserReservationsRef(
          auth.uid,
          BookingType.booking
        ).doc(reservationRef.id);

        transaction.set(userReservationRef, {
          ...request,
          timestamp: timestamp,
        });

        if (eventExists) {
          transaction.update(eventRef, {
            taken: true,
          });
        } else {
          transaction.set(eventRef, {
            time: request.time,
            taken: true,
          });
        }
      }
    });
  }
);

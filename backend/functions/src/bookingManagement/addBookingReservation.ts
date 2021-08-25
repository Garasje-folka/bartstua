import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  BookingReservationRequest,
  bookingReservationRequestSchema,
  BookingType,
  ReservationStatus,
} from "utils/dist/bookingManagement/types";
import { checkData } from "../helpers";
import {
  getEventRef,
  getReservationsRef,
  getUserReservationsRef,
} from "./helpers";
import {
  createTimestamp,
  isValidEventTime,
} from "utils/dist/bookingManagement/helpers";

export const addBookingReservation = functions.https.onCall(
  async (data, context) => {
    if (!(await checkData(data, bookingReservationRequestSchema))) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "unexpected-data-format"
      );
    }
    const request = data as BookingReservationRequest;

    if (!isValidEventTime(request.time)) {
      throw new functions.https.HttpsError("invalid-argument", "invalid-time");
    }

    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    await admin.firestore().runTransaction(async (transaction) => {
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

      const timestamp = createTimestamp(0);
      const reservationRef = getReservationsRef(BookingType.booking).doc();

      transaction.set(reservationRef, {
        ...request,
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

      if (eventSnapshot.exists) {
        transaction.update(eventRef, {
          taken: true,
        });
      } else {
        transaction.set(eventRef, {
          time: request.time,
          taken: true,
        });
      }
    });
  }
);

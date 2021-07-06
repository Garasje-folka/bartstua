import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { getEvent } from "./getEvent";
import {
  EVENTS,
  MAX_EVENT_SPACES,
  RESERVATIONS,
  RESERVATION_EXPIRATION_TIME,
} from "./constants";
import {
  BookingRequest,
  bookingRequestSchema,
  BookingData,
  EventData,
} from "./types";
import isValidEventDate from "./helpers/isValidEventDate";
import { removeExpiredReservation } from "./removeExpiredReservations";
import { cancelPaymentIntent, createPaymentIntent } from "../paymentManagement";

export const addReservation = functions.https.onCall(
  async (data: BookingRequest, context) => {
    // Check data format
    try {
      await bookingRequestSchema.validate(data);
    } catch (error) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "Not the expected data format"
      );
    }

    // Date validation
    if (!isValidEventDate(data.date)) {
      throw new functions.https.HttpsError("invalid-argument", "Invalid date");
    }

    // User authentication and validation
    const auth = context.auth;

    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    // Create PaymentIntent
    const amount = data.spaces * 100 * 100;
    const paymentIntent = await createPaymentIntent(amount);

    const booking: BookingData = {
      ...data,
      uid: auth.uid,
      paymentid: paymentIntent.id,
    };

    // Transaction that adds the reservation to firestore
    // TODO: Don't know if this is the correct way to catch the errors

    try {
      const reservationId = await admin
        .firestore()
        .runTransaction(async (transaction) => {
          const event = await getEvent(booking.date);
          let eventRef:
            | FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>
            | undefined = undefined;

          let spacesTaken: number = 0;

          if (event) {
            // Event already exists
            eventRef = admin.firestore().collection(EVENTS).doc(event.id);
            const docSnapshot = await transaction.get(eventRef);

            if (docSnapshot.exists) {
              const eventData = docSnapshot.data() as EventData;
              spacesTaken = eventData.spacesTaken;
            }
          }

          if (spacesTaken + booking.spaces > MAX_EVENT_SPACES) {
            throw new functions.https.HttpsError(
              "failed-precondition",
              "Not enough space"
            );
          }

          const newReservationRef = admin
            .firestore()
            .collection(RESERVATIONS)
            .doc();

          transaction.set(newReservationRef, booking);

          // Increment event spaces counter
          if (event && eventRef) {
            transaction.update(eventRef, {
              spacesTaken: admin.firestore.FieldValue.increment(booking.spaces),
            });
          } else {
            eventRef = admin.firestore().collection(EVENTS).doc();
            transaction.set(eventRef, {
              date: booking.date,
              spacesTaken: booking.spaces,
            });
          }

          return newReservationRef.id;
        });
      setTimeout(() => {
        removeExpiredReservation(reservationId);
      }, RESERVATION_EXPIRATION_TIME * 60 * 1000);

      return paymentIntent.client_secret;
    } catch (error) {
      await cancelPaymentIntent(paymentIntent.id);
      throw error;
    }
  }
);

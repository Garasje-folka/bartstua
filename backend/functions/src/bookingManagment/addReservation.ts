import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { BookingRequest, bookingRequestSchema, BookingData } from "./types";
import isValidEventDate from "./helpers/isValidEventDate";
import { addReservationHelper } from "./addReservationHelper";

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

    const reservation: BookingData = {
      ...data,
      uid: auth.uid,
    };

    await admin.firestore().runTransaction(async (transaction) => {
      await addReservationHelper(transaction, reservation);
    });
  }
);

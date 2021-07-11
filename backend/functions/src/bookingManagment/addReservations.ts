import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { bookingRequestSchema } from "./types";
import isValidEventDate from "./helpers/isValidEventDate";
import { addReservationHelper } from "./addReservationHelper";

// TODO: Add data type checking
export const addReservations = functions.https.onCall(async (data, context) => {
  // User authentication and validation
  const auth = context.auth;

  if (!auth || !auth.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );
  }

  admin.firestore().runTransaction(async (transaction) => {
    for (const reservation of data.reservations) {
      // Check data format
      try {
        await bookingRequestSchema.validate(reservation);
      } catch (error) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Not the expected data format"
        );
      }

      // Date validation
      if (!isValidEventDate(reservation.date)) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid date"
        );
      }

      await addReservationHelper(transaction, reservation);
    }
  });
});

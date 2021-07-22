import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {
  addReservationToTransaction,
  checkReservationRequest,
} from "./helpers";
import * as yup from "yup";
import {
  ReservationRequest,
  reservationRequestSchema,
} from "utils/dist/bookingManagement/types";
import { checkAuthentication, checkData } from "../helpers";
import { checkValidEventDate } from "./helpers";

const dataSchema = yup.object({
  requests: yup.array().of(reservationRequestSchema).required(),
});

export const addReservations = functions.https.onCall(async (data, context) => {
  const auth = checkAuthentication(context.auth);
  await checkData(data, dataSchema);
  const requests = data.requests as ReservationRequest[];

  // Information that has to be passed from the reading part of the transaction
  // to the writing part of the transaction
  const eventExistsMap = new Map<string, boolean>();

  admin.firestore().runTransaction(async (transaction) => {
    for (const request of requests) {
      checkValidEventDate(request.date);
      const eventDateString = JSON.stringify(request.date);

      if (eventExistsMap.get(eventDateString)) {
        // Having this restriction because it makes the implementaion much easier
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Can not have multiple requests for the same event"
        );
      } else {
        const eventExists = await checkReservationRequest(request, transaction);
        eventExistsMap.set(eventDateString, eventExists);
      }
    }

    for (const request of requests) {
      const eventDateString = JSON.stringify(request.date);
      const eventExists = !!eventExistsMap.get(eventDateString);
      await addReservationToTransaction(
        transaction,
        request,
        auth.uid,
        eventExists
      );
    }
  });
});

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { addReservationToTransaction } from "./helpers";
import * as yup from "yup";
import { reservationRequestSchema } from "utils/dist/bookingManagement/types";
import { checkAuthentication, checkData } from "../helpers";
import { checkValidEventDate } from "./helpers";

const dataSchema = yup.array().of(reservationRequestSchema);

export const addReservations = functions.https.onCall(async (data, context) => {
  const auth = checkAuthentication(context.auth);
  await checkData(data, dataSchema);

  admin.firestore().runTransaction(async (transaction) => {
    for (const request of data.requests) {
      checkValidEventDate(request);
      await addReservationToTransaction(transaction, request, auth.uid);
    }
  });
});

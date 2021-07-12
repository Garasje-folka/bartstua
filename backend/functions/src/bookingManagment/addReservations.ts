import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { addReservationToTransaction } from "./helpers";
import * as yup from "yup";
import { bookingRequestSchema } from "utils/dist/bookingManagement/types";
import { checkAuthentication, checkData } from "../helpers";
import { checkValidEventDate } from "./helpers";

const dataSchema = yup.array().of(bookingRequestSchema);

// TODO: Add data type checking
export const addReservations = functions.https.onCall(async (data, context) => {
  const auth = checkAuthentication(context.auth);
  checkData(data, dataSchema);

  admin.firestore().runTransaction(async (transaction) => {
    for (const request of data.requests) {
      checkValidEventDate(request);
      await addReservationToTransaction(transaction, request, auth.uid);
    }
  });
});

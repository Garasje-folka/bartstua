import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { addReservationToTransaction } from "./helpers";
import {
  ReservationRequest,
  reservationRequestSchema,
} from "utils/dist/bookingManagement/types";
import { checkValidEventDate } from "./helpers";
import { checkAuthentication, checkData } from "../helpers";

export const addReservation = functions.https.onCall(
  async (data: ReservationRequest, context) => {
    await checkData(data, reservationRequestSchema);
    checkValidEventDate(data.date);

    const auth = checkAuthentication(context.auth);

    admin.firestore().runTransaction(async (transaction) => {
      await addReservationToTransaction(transaction, data, auth.uid);
    });
  }
);

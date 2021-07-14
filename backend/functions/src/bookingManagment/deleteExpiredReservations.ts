import * as functions from "firebase-functions";
import { RESERVATION_EXPIRATION_TIME } from "utils/dist/bookingManagement/constants";

export const deleteExpiredReservations = functions.pubsub
  .schedule(`every ${RESERVATION_EXPIRATION_TIME} minutes`)
  .onRun((context) => {});

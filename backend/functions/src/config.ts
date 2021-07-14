import * as admin from "firebase-admin";
import { PubSub } from "@google-cloud/pubsub";
import { RESERVATION_CLEARING_INTERVAL } from "./bookingManagment/constants";

admin.initializeApp();

if (process.env.FUNCTIONS_EMULATOR) {
  const pubsub = new PubSub({
    apiEndpoint: "localhost:8085",
  });

  setInterval(() => {
    const SCHEDULED_FUNCTION_TOPIC =
      "firebase-schedule-deleteExpiredReservations";
    pubsub.topic(SCHEDULED_FUNCTION_TOPIC).publishJSON({});
  }, RESERVATION_CLEARING_INTERVAL * 60 * 1000);
}

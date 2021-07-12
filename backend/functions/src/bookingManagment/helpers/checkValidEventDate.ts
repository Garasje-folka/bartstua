import * as functions from "firebase-functions";
import { isValidEventDate } from "utils/dist/bookingManagement/helpers";
import { DateHour } from "utils/dist/dates/types";

export const checkValidEventDate = (date: DateHour) => {
  if (!isValidEventDate(date)) {
    throw new functions.https.HttpsError("invalid-argument", "Invalid date");
  }
};

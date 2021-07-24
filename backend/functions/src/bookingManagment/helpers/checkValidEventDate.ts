import * as functions from "firebase-functions";
import { isValidEventDate } from "utils/dist/bookingManagement/helpers";
import { DateHour } from "utils/dist/dates/types";
import { ADD_RESERVATION_ERRORS } from "utils/dist/bookingManagement/errors";

export const checkValidEventDate = (date: DateHour) => {
  if (!isValidEventDate(date)) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      ADD_RESERVATION_ERRORS.INVALID_DATE
    );
  }
};

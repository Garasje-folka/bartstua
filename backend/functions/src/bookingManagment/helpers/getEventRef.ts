import { DateHour } from "utils/dist/dates/types";
import * as admin from "firebase-admin";
import { EVENTS } from "utils/dist/bookingManagement/constants";
import { getEventId } from "utils/dist/bookingManagement/helpers";

export const getEventRef = (date: DateHour) => {
  return admin.firestore().collection(EVENTS).doc(getEventId(date));
};

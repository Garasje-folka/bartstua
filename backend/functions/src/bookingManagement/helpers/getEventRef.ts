import { DateTime } from "utils/dist/dates/types";
import * as admin from "firebase-admin";
import {
  getEventId,
  getEventCollectionName,
} from "utils/dist/bookingManagement/helpers";
import { BookingType } from "utils/dist/bookingManagement/types";
import { SAUNAS } from "utils/dist/bookingManagement/constants";

export const getEventRef = (
  saunaId: string,
  type: BookingType,
  time: DateTime
) => {
  return admin
    .firestore()
    .collection(SAUNAS)
    .doc(saunaId)
    .collection(getEventCollectionName(type))
    .doc(getEventId(time));
};

import { DateTime } from "utils/dist/dates/types";
import * as admin from "firebase-admin";
import {
  getEventId,
  getEventCollectionName,
} from "utils/dist/bookingManagement/helpers";
import { BookingType, EventLocation } from "utils/dist/bookingManagement/types";
import { EVENTS } from "utils/dist/bookingManagement/constants";

export const getEventRef = (
  location: EventLocation,
  type: BookingType,
  time: DateTime
) => {
  return admin
    .firestore()
    .collection(EVENTS)
    .doc(location)
    .collection(getEventCollectionName(type))
    .doc(getEventId(time));
};

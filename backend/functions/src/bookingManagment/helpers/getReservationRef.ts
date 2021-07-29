import * as admin from "firebase-admin";
import { BookingType, EventLocation } from "utils/dist/bookingManagement/types";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { getReservationCollectionName } from "utils/dist/bookingManagement/helpers";

export const getReservationsRef = (
  location: EventLocation,
  type: BookingType
) => {
  return admin
    .firestore()
    .collection(RESERVATIONS)
    .doc(location)
    .collection(getReservationCollectionName(type));
};

import * as admin from "firebase-admin";
import { BookingType } from "utils/dist/bookingManagement/types";
import { getReservationCollectionName } from "utils/dist/bookingManagement/helpers";

export const getReservationsRef = (type: BookingType) => {
  return admin.firestore().collection(getReservationCollectionName(type));
};

import * as admin from "firebase-admin";
import { USERS } from "utils/dist/userManagement/constants";
import { BookingType } from "utils/dist/bookingManagement/types";
import { getReservationCollectionName } from "utils/dist/bookingManagement/helpers";

export const getUserReservationsRef = (uid: string, type: BookingType) => {
  return admin
    .firestore()
    .collection(USERS)
    .doc(uid)
    .collection(getReservationCollectionName(type));
};

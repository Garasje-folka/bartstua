import * as admin from "firebase-admin";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { USERS } from "utils/dist/userManagement/constants";

export const getUserReservationsRef = (uid: string) => {
  return admin.firestore().collection(USERS).doc(uid).collection(RESERVATIONS);
};

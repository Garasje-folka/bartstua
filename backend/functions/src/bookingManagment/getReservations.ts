import * as admin from "firebase-admin";
import {RESERVATIONS} from "./constants";

export const getReservations = async (uid: string) => {
  return admin
      .firestore()
      .collection(RESERVATIONS)
      .where("uid", "==", uid)
      .get();
};

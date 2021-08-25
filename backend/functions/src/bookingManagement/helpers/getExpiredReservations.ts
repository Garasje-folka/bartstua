import * as admin from "firebase-admin";
import { BookingType } from "utils/dist/bookingManagement/types";
import { RESERVATION_EXPIRATION_TIME } from "utils/dist/bookingManagement/constants";
import {
  createTimestamp,
  getReservationCollectionName,
} from "utils/dist/bookingManagement/helpers";

// TODO: Check for expired by time also
export const getExpiredReservations = async (
  transaction: FirebaseFirestore.Transaction,
  type: BookingType
) => {
  const thresholdTimestamp = createTimestamp(-RESERVATION_EXPIRATION_TIME);
  const queryRef = admin
    .firestore()
    .collection(getReservationCollectionName(type))
    .where("status", "==", "active")
    .where("timestamp", "<=", thresholdTimestamp);
  return await transaction.get(queryRef);
};

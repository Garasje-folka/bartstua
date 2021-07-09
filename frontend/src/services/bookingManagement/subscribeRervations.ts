import { auth, firestore } from "../fireConfig";
import { BookingData, firestoreConstants } from "utils";
import { createError } from "../userManagement/helpers/createError";
import { userManagementErrorCodes } from "../userManagement/constants";

const { RESERVATIONS } = firestoreConstants;

export const onReservationsChanged = (
  callback: (reservations: BookingData[]) => void
): (() => void) => {
  if (!auth.currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(RESERVATIONS)
    .where("uid", "==", auth.currentUser.uid);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map(
      (doc) => doc.data() as BookingData
    );
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

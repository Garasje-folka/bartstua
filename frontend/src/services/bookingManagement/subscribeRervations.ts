import { auth, firestore } from "../fireConfig";
import { BookingData, Doc, firestoreConstants } from "utils";
import { createError } from "utils/src/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";

const { RESERVATIONS } = firestoreConstants;

export const onReservationsChanged = (
  callback: (reservations: Doc<BookingData>[]) => void
): (() => void) => {
  if (!auth.currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(RESERVATIONS)
    .where("uid", "==", auth.currentUser.uid);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as BookingData;
      return {
        data: data,
        id: doc.id,
      } as Doc<BookingData>;
    });
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

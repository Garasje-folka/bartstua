import { auth, firestore } from "../fireConfig";
import { createError } from "utils/dist/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";
import { ReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { USERS } from "utils/dist/userManagement/constants";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";

export const onReservationsChanged = (
  callback: (reservations: Doc<ReservationData>[]) => void
): (() => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(USERS)
    .doc(currentUser.uid)
    .collection(RESERVATIONS);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as ReservationData;
      return {
        data: data,
        id: doc.id,
      } as Doc<ReservationData>;
    });
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

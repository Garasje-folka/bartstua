import { auth, firestore } from "../fireConfig";
import { createError } from "utils/dist/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";
import { BookingReservationData as FullSaunaReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { BOOKING_RESERVATIONS } from "utils/dist/bookingManagement/constants";

export const onFullSaunaReservationsChanged = (
  callback: (reservations: Doc<FullSaunaReservationData>[]) => void
): (() => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(BOOKING_RESERVATIONS)
    .where("uid", "==", currentUser.uid);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as FullSaunaReservationData;
      return {
        data: data,
        id: doc.id,
      } as Doc<FullSaunaReservationData>;
    });
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

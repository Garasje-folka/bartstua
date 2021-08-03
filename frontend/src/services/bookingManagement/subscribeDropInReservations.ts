import { auth, firestore } from "../fireConfig";
import { createError } from "utils/dist/helpers";
import { userManagementErrorCodes } from "../userManagement/constants";
import {
  BookingType,
  DropInReservationData,
} from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { USERS } from "utils/dist/userManagement/constants";
import { getReservationCollectionName } from "utils/dist/bookingManagement/helpers";

export const onDropInReservationsChanged = (
  callback: (reservations: Doc<DropInReservationData>[]) => void
): (() => void) => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    throw createError(userManagementErrorCodes.ERROR_NO_USER);
  }
  const reservationsRef = firestore
    .collection(USERS)
    .doc(currentUser.uid)
    .collection(getReservationCollectionName(BookingType.dropIn));

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data() as DropInReservationData;
      return {
        data: data,
        id: doc.id,
      } as Doc<DropInReservationData>;
    });
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

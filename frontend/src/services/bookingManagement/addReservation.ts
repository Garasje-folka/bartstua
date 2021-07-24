import firebase from "firebase";
import { ADD_RESERVATION_ERRORS } from "utils/dist/bookingManagement/errors";
import { ReservationRequest } from "utils/dist/bookingManagement/types";
import { createError } from "utils/dist/helpers";

const addReservation = async (booking: ReservationRequest) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    switch (error.message) {
      case ADD_RESERVATION_ERRORS.USER_UNAUTHENTICATED:
        throw createError(ADD_RESERVATION_ERRORS.USER_UNAUTHENTICATED);
      case ADD_RESERVATION_ERRORS.INVALID_DATE:
        throw createError(ADD_RESERVATION_ERRORS.INVALID_DATE);
      case ADD_RESERVATION_ERRORS.NOT_ENOUGH_SPACE:
        throw createError(ADD_RESERVATION_ERRORS.NOT_ENOUGH_SPACE);
      case ADD_RESERVATION_ERRORS.UNEXPECTED_DATA_FORMAT:
        throw createError(ADD_RESERVATION_ERRORS.UNEXPECTED_DATA_FORMAT);
      default:
        throw createError(ADD_RESERVATION_ERRORS.UNKNOWN);
    }
  }
};

export { addReservation };

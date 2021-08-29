import firebase from "firebase";
import { DropInReservationRequest } from "utils/dist/bookingManagement/types";
import { ADD_RESERVATIONS_ERRORS } from "utils/dist/bookingManagement/errors";
import { createError } from "utils/dist/helpers";

const addDropInReservations = async (requests: DropInReservationRequest[]) => {
  const call = firebase.functions().httpsCallable("addDropInReservations");
  const data = {
    requests: requests,
  };

  try {
    await call(data);
  } catch (error) {
    switch (error.message) {
      case ADD_RESERVATIONS_ERRORS.USER_UNAUTHENTICATED:
        throw createError(ADD_RESERVATIONS_ERRORS.USER_UNAUTHENTICATED);
      case ADD_RESERVATIONS_ERRORS.DUPLICATE_REQUESTS:
        throw createError(ADD_RESERVATIONS_ERRORS.DUPLICATE_REQUESTS);
      case "invalid-time":
        throw createError("invalid-time");
      case ADD_RESERVATIONS_ERRORS.NOT_ENOUGH_SPACE:
        throw createError(ADD_RESERVATIONS_ERRORS.NOT_ENOUGH_SPACE);
      case ADD_RESERVATIONS_ERRORS.UNEXPECTED_DATA_FORMAT:
        throw createError(ADD_RESERVATIONS_ERRORS.UNEXPECTED_DATA_FORMAT);
      default:
        throw createError(ADD_RESERVATIONS_ERRORS.UNKNOWN);
    }
  }
};

export { addDropInReservations };

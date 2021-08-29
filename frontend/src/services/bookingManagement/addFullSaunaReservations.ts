import firebase from "firebase";
import { FullSaunaReservationRequest } from "utils/dist/bookingManagement/types";
import { ADD_RESERVATIONS_ERRORS } from "utils/dist/bookingManagement/errors";
import { createError } from "utils/dist/helpers";

const addFullSaunaReservations = async (
  requests: FullSaunaReservationRequest[]
) => {
  const call = firebase.functions().httpsCallable("addFullSaunaReservations");
  const data = {
    requests,
  };

  try {
    await call(data);
  } catch (error) {
    switch (error.message) {
      case ADD_RESERVATIONS_ERRORS.USER_UNAUTHENTICATED:
        throw createError(ADD_RESERVATIONS_ERRORS.USER_UNAUTHENTICATED);
      case ADD_RESERVATIONS_ERRORS.DUPLICATE_REQUESTS:
        throw createError(ADD_RESERVATIONS_ERRORS.DUPLICATE_REQUESTS);
      case ADD_RESERVATIONS_ERRORS.INVALID_DATE:
        throw createError(ADD_RESERVATIONS_ERRORS.INVALID_DATE);
      case ADD_RESERVATIONS_ERRORS.NOT_ENOUGH_SPACE:
        throw createError(ADD_RESERVATIONS_ERRORS.NOT_ENOUGH_SPACE);
      case ADD_RESERVATIONS_ERRORS.UNEXPECTED_DATA_FORMAT:
        throw createError(ADD_RESERVATIONS_ERRORS.UNEXPECTED_DATA_FORMAT);
      default:
        throw createError(ADD_RESERVATIONS_ERRORS.UNKNOWN);
    }
  }
};

export { addFullSaunaReservations };

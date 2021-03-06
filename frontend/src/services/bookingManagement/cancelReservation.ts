import firebase from "firebase";
import { CANCEL_RESERVATION_ERRORS } from "utils/dist/bookingManagement/errors";
import { BookingType } from "utils/dist/bookingManagement/types";
import { createError } from "utils/dist/helpers";

const cancelReservation = async (docid: string, type: BookingType) => {
  const call = firebase.functions().httpsCallable("cancelReservation");
  const data = {
    docid: docid,
    type: type,
  };
  try {
    await call(data);
  } catch (error) {
    switch (error.message) {
      case CANCEL_RESERVATION_ERRORS.USER_UNAUTHENTICATED:
        throw createError(CANCEL_RESERVATION_ERRORS.USER_UNAUTHENTICATED);
      case CANCEL_RESERVATION_ERRORS.NOT_OWNER:
        throw createError(CANCEL_RESERVATION_ERRORS.NOT_OWNER);
      case CANCEL_RESERVATION_ERRORS.UNEXPECTED_DATA_FORMAT:
        throw createError(CANCEL_RESERVATION_ERRORS.UNEXPECTED_DATA_FORMAT);
      default:
        throw createError(CANCEL_RESERVATION_ERRORS.UNKNOWN);
    }
  }
};

export { cancelReservation };

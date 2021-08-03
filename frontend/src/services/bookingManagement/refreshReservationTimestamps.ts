import firebase from "firebase";
import { REFRESH_RESERVATION_TIMESTAMPS_ERRORS } from "utils/dist/bookingManagement/errors";
import { createError } from "utils/dist/helpers";

const refreshReservationTimestamps = async () => {
  const call = firebase
    .functions()
    .httpsCallable("refreshReservationTimestamps");
  try {
    await call();
  } catch (error) {
    switch (error.message) {
      case REFRESH_RESERVATION_TIMESTAMPS_ERRORS.USER_UNAUTHENTICATED:
        throw createError(
          REFRESH_RESERVATION_TIMESTAMPS_ERRORS.USER_UNAUTHENTICATED
        );
      default:
        throw createError(REFRESH_RESERVATION_TIMESTAMPS_ERRORS.UNKNOWN);
    }
  }
};

export { refreshReservationTimestamps };

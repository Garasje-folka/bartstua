import * as functions from "firebase-functions";
import { MAX_EVENT_SPACES } from "utils/dist/bookingManagement/constants";
import { ReservationRequest } from "utils/dist/bookingManagement/types";
import { ADD_RESERVATION_ERRORS } from "utils/dist/bookingManagement/errors";

export const checkReservationRequestSpaces = (
  request: ReservationRequest,
  eventSpacesTaken: number
) => {
  const spaces = eventSpacesTaken + request.spaces;
  if (spaces > MAX_EVENT_SPACES) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      ADD_RESERVATION_ERRORS.NOT_ENOUGH_SPACE
    );
  }
  return spaces;
};

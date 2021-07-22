import { ReservationRequest } from "utils/dist/bookingManagement/types";
import { getEventRef } from "./getEventRef";
import { checkReservationRequestSpaces } from "./checkReservationRequestSpaces";

export const checkReservationRequest = async (
  request: ReservationRequest,
  transaction: FirebaseFirestore.Transaction
) => {
  const eventRef = getEventRef(request.date);
  const eventSnapshot = await transaction.get(eventRef);

  let eventExists = false;
  let spacesTaken = 0;
  if (eventSnapshot.exists) {
    eventExists = true;
    spacesTaken = eventSnapshot.get("spacesTaken");
  }

  checkReservationRequestSpaces(request, spacesTaken);

  return eventExists;
};

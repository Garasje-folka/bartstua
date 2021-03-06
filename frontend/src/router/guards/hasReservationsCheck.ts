import { DropInReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { BOOKING, HOME } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";

// TODO: Check for booking reservations also, but must create redux state first
const hasReservationsCheck: (
  dropInReservations: Doc<DropInReservationData>[],
  expectedValue?: boolean
) => GuardFunction = (dropInReservations, expectedValue) => () => ({
  accepted:
    (expectedValue && dropInReservations.length > 0) ||
    (!expectedValue && dropInReservations.length === 0),
  redirectPath: expectedValue ? BOOKING : HOME,
});

export { hasReservationsCheck };

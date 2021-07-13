import { ReservationData } from "utils/dist/bookingManagement/types";
import { Doc } from "utils/dist/types";
import { BOOKING, HOME } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";

const hasReservationsCheck: (
  reservations: Doc<ReservationData>[],
  expectedValue?: boolean
) => GuardFunction = (reservations, expectedValue) => () => ({
  accepted:
    (expectedValue && reservations.length > 0) ||
    (!expectedValue && reservations.length === 0),
  redirectPath: expectedValue ? BOOKING : HOME,
});

export { hasReservationsCheck };

import { BOOKING, HOME } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";
import { BookingData, Doc } from "utils";

const hasReservationsCheck: (
  reservations: Doc<BookingData>[],
  expectedValue?: boolean
) => GuardFunction = (reservations, expectedValue) => () => ({
  accepted:
    (expectedValue && reservations.length > 0) ||
    (!expectedValue && reservations.length === 0),
  redirectPath: expectedValue ? BOOKING : HOME,
});

export { hasReservationsCheck };

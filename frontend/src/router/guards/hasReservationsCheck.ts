import { BOOKING, HOME } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";
import { BookingData } from "utils";

const hasReservationsCheck: (
  reservations: BookingData[],
  expectedValue?: boolean
) => GuardFunction = (reservations, expectedValue) => () => ({
  accepted:
    (expectedValue && reservations.length > 0) ||
    (!expectedValue && reservations.length === 0),
  redirectPath: expectedValue ? BOOKING : HOME,
});

export { hasReservationsCheck };

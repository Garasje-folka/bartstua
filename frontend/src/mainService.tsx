import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingData, Doc } from "../../utils/dist/types";
import { authChanged, currentUserSelector } from "./redux/ducks/currentUser";
import { reservationsUpdated } from "./redux/ducks/reservations";

import { bookingManagement, userManagement } from "./services";
import isEqualDates from "./services/bookingManagement/helpers/isEqualDates";

const MainService = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    // Update redux when current user changes
    const unsubCurrentUserChanged = userManagement.onCurrentUserChanged(
      (user) => {
        dispatch(authChanged(user));
      }
    );

    return () => {
      unsubCurrentUserChanged();
    };
  }, [dispatch]);

  /*
  // Merging reservations for the same event
  // TODO: Clean up.... Maybe sort by time for convenience
  const squashReservations = (reservations: Doc<BookingData>[]) => {
    const result: Doc<BookingData>[] = [];
    while (reservations.length > 0) {
      let squashed = reservations.pop();
      if (!squashed) continue;

      for (let i = reservations.length - 1; i >= 0; i--) {
        const reservation = reservations[i];
        if (!reservation) continue;

        if (isEqualDates(squashed.data.date, reservation.data.date)) {
          squashed.data.spaces += reservation.data.spaces;
          reservations.splice(i, 1);
        }
      }
      result.push(squashed);
    }

    return result;
  };
  */

  useEffect(() => {
    // Update redux when reservations are updated
    if (!currentUser) {
      dispatch(reservationsUpdated([]));
      return;
    }

    const unsubReservationsUpdated = bookingManagement.onReservationsChanged(
      (reservations) => {
        dispatch(reservationsUpdated(reservations));
      }
    );

    return () => {
      unsubReservationsUpdated();
    };
  }, [dispatch, currentUser]);

  return <></>;
};

export { MainService };

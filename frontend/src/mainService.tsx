import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authChanged, currentUserSelector } from "./redux/ducks/currentUser";
import { reservationsUpdated } from "./redux/ducks/reservations";

import { bookingManagement, userManagement } from "./services";

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

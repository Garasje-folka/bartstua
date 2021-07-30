import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authChanged, currentUserSelector } from "./redux/ducks/currentUser";
import { dropInReservationsUpdated } from "./redux/ducks/dropInReservations";
import { onDropInReservationsChanged } from "./services/bookingManagement";
import { onCurrentUserChanged } from "./services/userManagement";

const MainService = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);

  useEffect(() => {
    // Update redux when current user changes
    const unsubCurrentUserChanged = onCurrentUserChanged((user) => {
      dispatch(authChanged(user));
    });

    return () => {
      unsubCurrentUserChanged();
    };
  }, [dispatch]);

  useEffect(() => {
    // Update redux when reservations are updated
    if (!currentUser) {
      dispatch(dropInReservationsUpdated([]));
      return;
    }

    const unsubReservationsUpdated = onDropInReservationsChanged(
      (reservations) => {
        dispatch(dropInReservationsUpdated(reservations));
      }
    );

    return () => {
      unsubReservationsUpdated();
    };
  }, [dispatch, currentUser]);

  return <></>;
};

export { MainService };

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookingType } from "utils/dist/bookingManagement/types";
import { authChanged, currentUserSelector } from "./redux/ducks/currentUser";
import { dropInReservationsUpdated } from "./redux/ducks/dropInReservations";
import { fullSaunaReservationsUpdated } from "./redux/ducks/fullSaunaReservations";
import { onReservationsChanged } from "./services/bookingManagement/subscribeReservations";
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

    const unsubDropInReservationsUpdated = onReservationsChanged(
      BookingType.dropIn
    )((reservations) => {
      dispatch(dropInReservationsUpdated(reservations));
    });
    const unsubFullSaunaReservationsUpdated = onReservationsChanged(
      BookingType.fullSauna
    )((reservations) => {
      dispatch(fullSaunaReservationsUpdated(reservations));
    });

    return () => {
      unsubDropInReservationsUpdated();
      unsubFullSaunaReservationsUpdated();
    };
  }, [dispatch, currentUser]);

  return <></>;
};

export { MainService };

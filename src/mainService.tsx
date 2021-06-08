import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { authChanged } from "./redux/ducks/currentUser";

import { userManagement } from "./services";
import { currentUserSelector } from "./redux/selectors";

const MainService = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(currentUserSelector);
  const history = useHistory();
  const location = useLocation();

  let unsubCurrentUserChanged = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (
      location.pathname !== "/verify" &&
      currentUser &&
      !currentUser.emailVerified
    ) {
      history.push("/verify");
    }
  }, [currentUser, history, location]);

  useEffect(() => {
    // Update redux when current user changes
    if (unsubCurrentUserChanged.current) unsubCurrentUserChanged.current();
    unsubCurrentUserChanged.current = userManagement.onCurrentUserChanged(
      (user) => {
        dispatch(authChanged(user));
      }
    );
  }, [dispatch]);

  return <></>;
};

export { MainService };

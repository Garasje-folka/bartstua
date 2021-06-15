import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { authChanged } from "./redux/ducks/currentUser";

import { userManagement } from "./services";

const MainService = () => {
  const dispatch = useDispatch();

  let unsubCurrentUserChanged = useRef<(() => void) | null>(null);

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

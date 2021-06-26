import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authChanged } from "./redux/ducks/currentUser";

import { userManagement } from "./services";

const MainService = () => {
  const dispatch = useDispatch();

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

  return <></>;
};

export { MainService };

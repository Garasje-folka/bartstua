import store from "../../redux/store";
import { GuardFunction } from "react-router-guards";
import { State } from "../../redux/types/state";
import * as currentUser from "../../redux/ducks/currentUser";
import { SIGNIN } from "../routeConstants";

const requireLogin: GuardFunction = (to, from, next) => {
  const doChecksIfLoggedIn = (unsub: (() => void) | undefined) => {
    const newState: State = store.getState();
    if (currentUser.loadedSelector(newState)) {
      if (unsub) unsub();
      if (currentUser.currentUserSelector(newState)) {
        next();
      } else {
        next.redirect(SIGNIN);
      }
      return true;
    } else {
      return false;
    }
  };

  // Check if state is already loaded
  if (!doChecksIfLoggedIn(undefined)) {
    // Wait for state to load
    const unsub = store.subscribe(() => {
      doChecksIfLoggedIn(unsub);
    });
  }
};

export { requireLogin };

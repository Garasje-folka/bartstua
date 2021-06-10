import store from "../../redux/store";
import { GuardFunction } from "react-router-guards";
import { State } from "../../redux/types/state";
import * as currentUser from "../../redux/ducks/currentUser";

const requireLogin: GuardFunction = (to, from, next) => {
  // Check if state is already loaded
  const state: State = store.getState();
  if (currentUser.loadedSelector(state)) {
    if (currentUser.currentUserSelector(state)) {
      next();
    } else {
      next.redirect("/login");
    }
  }

  // Wait for state to load
  const unsub = store.subscribe(() => {
    const newState: State = store.getState();
    if (currentUser.loadedSelector(newState)) {
      if (currentUser.currentUserSelector(newState)) {
        unsub();
        next();
      } else {
        unsub();
        next.redirect("/login");
      }
    }
  });
};

export { requireLogin };

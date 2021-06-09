import store from "../../redux/store";
import { GuardFunction } from "react-router-guards";
import { State } from "../../redux/ducks/types/state";
import * as currentUser from "../../redux/ducks/currentUser";

const requireLogin: GuardFunction = (to, from, next) => {
  const unsub = store.subscribe(() => {
    const state: State = store.getState();
    if (currentUser.loadedSelector(state)) {
      if (currentUser.currentUserSelector(state)) {
        next();
        unsub();
      } else {
        next.redirect("/login");
        unsub();
      }
    }
  });
};

export { requireLogin };

import store from "../../redux/store";
import { GuardFunction } from "react-router-guards";

const requireLogin: GuardFunction = (to, from, next) => {
  // TODO: Bug, does not wait for state to load. Can still redirect even if user is logged in.
  // Maybe create another router guard that waits for state to load somehow?
  if (store.getState().currentUser) {
    next();
  }

  next.redirect("/login");
};

export { requireLogin };

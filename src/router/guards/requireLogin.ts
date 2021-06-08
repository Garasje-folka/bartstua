import { isLoggedIn } from "../../services/userManagement";
import { GuardFunction } from "react-router-guards";

const requireLogin: GuardFunction = (to, from, next) => {
  if (isLoggedIn()) {
    next();
  }

  next.redirect("/login");
};

export { requireLogin };

import { SIGNIN } from "../routeConstants";
import { User } from "../../services/userManagement/interfaces";
import { GuardFunction } from "../types/guardFunction";

const requireLogin: (currentUser: User | null) => GuardFunction =
  (currentUser) => () => ({
    accepted: !!currentUser,
    redirectPath: SIGNIN,
  });

export { requireLogin };

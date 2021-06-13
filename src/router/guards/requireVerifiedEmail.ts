import { SIGNIN, VERIFY } from "../routeConstants";
import { User } from "../../services/userManagement/interfaces";
import { GuardFunction } from "../types/guardFunction";

const requireVerifiedEmail: (currentUser: User | null) => GuardFunction =
  (currentUser) => () => ({
    accepted: !!currentUser && currentUser.emailVerified,
    redirectPath: currentUser ? VERIFY : SIGNIN,
  });

export { requireVerifiedEmail };

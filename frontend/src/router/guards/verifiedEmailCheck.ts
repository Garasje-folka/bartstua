import { User } from "../../services/userManagement/types";
import { HOME, SIGNIN, VERIFY } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";

const verifiedEmailCheck: (
  currentUser: User | null,
  expectedValue?: boolean
) => GuardFunction = (currentUser, expectedValue) => () => ({
  accepted:
    !!currentUser &&
    !!currentUser.email &&
    ((expectedValue && currentUser.emailVerified) ||
      (!expectedValue && !currentUser.emailVerified)),
  redirectPath:
    currentUser && currentUser.email ? (expectedValue ? VERIFY : HOME) : SIGNIN,
});

export { verifiedEmailCheck };

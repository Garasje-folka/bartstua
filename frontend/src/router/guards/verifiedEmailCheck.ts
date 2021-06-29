import { HOME, SIGNIN, VERIFY } from "../routeConstants";
import { User } from "shared/src/types";
import { GuardFunction } from "../types/guardFunction";

const verifiedEmailCheck: (
  currentUser: User | null,
  expectedValue?: boolean
) => GuardFunction = (currentUser, expectedValue) => () => ({
  accepted:
    !!currentUser &&
    ((expectedValue && currentUser.emailVerified) ||
      (!expectedValue && !currentUser.emailVerified)),
  redirectPath: currentUser ? (expectedValue ? VERIFY : HOME) : SIGNIN,
});

export { verifiedEmailCheck };

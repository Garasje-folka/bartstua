import { User } from "../../services/userManagement/types";
import { HOME, SIGNIN } from "../routeConstants";
import { GuardFunction } from "../types/guardFunction";

const emailSignInCheck: (
  currentUser: User | null,
  expectedValue?: boolean
) => GuardFunction = (currentUser, expectedValue) => () => ({
  accepted:
    (expectedValue && !!currentUser && !!currentUser.email) ||
    (!expectedValue && (!currentUser || !currentUser.email)),
  redirectPath: expectedValue ? SIGNIN : HOME,
});

export { emailSignInCheck };

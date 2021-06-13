import { HOME, SIGNIN, VERIFY } from "../routeConstants";
import { User } from "../../services/userManagement/interfaces";
import { GuardFunction } from "../types/guardFunction";

const verifiedEmailCheck: (
  currentUser: User | null,
  meta?: boolean
) => GuardFunction = (currentUser, meta) => () => ({
  accepted:
    !!currentUser &&
    ((meta && currentUser.emailVerified) ||
      (!meta && !currentUser.emailVerified)),
  redirectPath: currentUser ? (meta ? VERIFY : HOME) : SIGNIN,
});

export { verifiedEmailCheck };

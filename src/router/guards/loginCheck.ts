import { HOME, SIGNIN } from "../routeConstants";
import { User } from "../../services/userManagement/interfaces";
import { GuardFunction } from "../types/guardFunction";

const loginCheck: (currentUser: User | null, meta?: boolean) => GuardFunction =
  (currentUser, meta) => () => ({
    accepted: (meta && !!currentUser) || (!meta && !currentUser),
    redirectPath: meta ? SIGNIN : HOME,
  });

export { loginCheck };

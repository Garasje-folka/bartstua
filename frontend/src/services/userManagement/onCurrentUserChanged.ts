import { auth } from "../fireConfig";
import userConverter from "./helpers/userConverter";
import { User } from "./types";

const onCurrentUserChanged = (callback: (user: User | null) => void) => {
  // TODO: Return own unsubscribe function instead?
  return auth.onAuthStateChanged((user) =>
    user ? callback(userConverter(user)) : callback(null)
  );
};

export { onCurrentUserChanged };

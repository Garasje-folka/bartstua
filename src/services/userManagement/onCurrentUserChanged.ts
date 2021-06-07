import { User } from "./interfaces";
import { auth } from "../fireConfig";
import userConverter from "./helpers/userConverter";

const onCurrentUserChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged((user) =>
    user ? callback(userConverter(user)) : null
  );
};

export { onCurrentUserChanged };

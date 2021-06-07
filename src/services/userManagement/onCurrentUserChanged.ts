import { User } from "./interfaces";
import { auth } from "../fireConfig";

const onCurrentUserChanged = (callback: (user: User | null) => void) => {
  return auth.onAuthStateChanged(callback);
};

export { onCurrentUserChanged };

import { userChangedCallback } from "./onCurrentUserChanged";

const signOut = async () => {
  if (userChangedCallback) userChangedCallback(null);
};

export { signOut };

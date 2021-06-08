import { auth } from "../fireConfig";

const isLoggedIn = () => {
  return auth.currentUser !== null;
};

export { isLoggedIn };

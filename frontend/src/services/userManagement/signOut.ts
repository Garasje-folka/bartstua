import { auth } from "../fireConfig";

const signOut = () => {
  return auth.signOut();
};

export { signOut };

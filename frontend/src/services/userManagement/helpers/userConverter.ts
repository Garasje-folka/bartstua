import firebase from "firebase";
import { User } from "../types";

const userConverter = (user: firebase.User): User => {
  return {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    uid: user.uid,
  };
};

export default userConverter;

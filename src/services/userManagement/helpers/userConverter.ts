import firebase from "firebase";
import { User } from "../interfaces";

const userConverter = (user: firebase.User): User => {
  return {
    displayName: user.displayName ? user.displayName : "NO NAME",
    email: user.email ? user.email : "NO EMAIL",
    emailVerified: user.emailVerified,
    uid: user.uid,
  };
};

export default userConverter;

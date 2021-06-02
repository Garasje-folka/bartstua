import firebase from "firebase";
import User from "../../interfaces/User";

const userConverter = (user: firebase.User): User => {
  return {
    displayName: user.displayName ? user.displayName : "NO NAME",
    email: user.email ? user.email : "NO EMAIL",
    emailVerified: user.emailVerified,
    uid: user.uid,
    sendEmailVerification: user.sendEmailVerification,
  };
};

export default userConverter;

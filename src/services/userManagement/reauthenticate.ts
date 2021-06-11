import firebase from "../fireConfig";
import { userManagementErrors, USER_MANAGEMENT } from "./constants";

const reauthenticateErrors = {
  ERROR_NO_USER: USER_MANAGEMENT + "/no-user",
  ERROR_WRONG_PASSWORD: USER_MANAGEMENT + "/wrong-password",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN_USER_MANAGEMENT,
};

const reauthenticate = (password: string) => {
  const user = firebase.auth().currentUser;

  if (!user || !user.email) throw reauthenticateErrors.ERROR_NO_USER;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);

  return user
    .reauthenticateWithCredential(cred)
    .then((newCred) => {
      // TODO: Convert to own User type instead of returning firebase user?
      return newCred.user;
    })
    .catch((error) => {
      switch (error.code) {
        case "auth/wrong-password":
          throw reauthenticateErrors.ERROR_WRONG_PASSWORD;
        default:
          throw reauthenticateErrors.ERROR_UNKNOWN;
      }
    });
};

export { reauthenticate, reauthenticateErrors };

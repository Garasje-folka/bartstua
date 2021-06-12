import firebase from "../fireConfig";
import { userManagementErrors, USER_MANAGEMENT } from "./constants";

const reauthenticateErrors = {
  ERROR_NO_USER: userManagementErrors.ERROR_NO_USER,
  ERROR_WRONG_PASSWORD: USER_MANAGEMENT + "/wrong-password",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN,
};

const reauthenticate = async (password: string) => {
  const user = firebase.auth().currentUser;

  if (!user || !user.email) throw reauthenticateErrors.ERROR_NO_USER;
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);

  try {
    await user.reauthenticateWithCredential(cred);
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        throw reauthenticateErrors.ERROR_WRONG_PASSWORD;
      default:
        throw reauthenticateErrors.ERROR_UNKNOWN;
    }
  }
};

export { reauthenticate, reauthenticateErrors };

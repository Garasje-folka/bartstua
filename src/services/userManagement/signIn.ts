import { auth } from "../fireConfig";
import { userManagementErrors, USER_MANAGEMENT } from "./constants";

const signInErrors = {
  ERROR_INVALID_EMAIL: USER_MANAGEMENT + "/invalid-email",
  ERROR_USER_DISABLED: USER_MANAGEMENT + "/user-disabled",
  ERROR_USER_NOT_FOUND: USER_MANAGEMENT + "/user-not-found",
  ERROR_WRONG_PASSWORD: USER_MANAGEMENT + "/wrong-password",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN,
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        throw signInErrors.ERROR_INVALID_EMAIL;
      case "auth/user-disabled":
        throw signInErrors.ERROR_USER_DISABLED;
      case "auth/user-not-found":
        throw signInErrors.ERROR_USER_NOT_FOUND;
      case "auth/wrong-password":
        throw signInErrors.ERROR_WRONG_PASSWORD;
      default:
        throw signInErrors.ERROR_UNKNOWN;
    }
  }
};

export { signInWithEmailAndPassword, signInErrors };

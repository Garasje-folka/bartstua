import { auth } from "../fireConfig";
import { userManagementErrorCodes, USER_MANAGEMENT } from "./constants";
import { createError } from "utils/dist/helpers";

const signInErrorCodes = {
  ERROR_INVALID_EMAIL: USER_MANAGEMENT + "/invalid-email",
  ERROR_USER_DISABLED: USER_MANAGEMENT + "/user-disabled",
  ERROR_USER_NOT_FOUND: USER_MANAGEMENT + "/user-not-found",
  ERROR_WRONG_PASSWORD: USER_MANAGEMENT + "/wrong-password",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        throw createError(signInErrorCodes.ERROR_INVALID_EMAIL);
      case "auth/user-disabled":
        throw createError(signInErrorCodes.ERROR_USER_DISABLED);
      case "auth/user-not-found":
        throw createError(signInErrorCodes.ERROR_USER_NOT_FOUND);
      case "auth/wrong-password":
        throw createError(signInErrorCodes.ERROR_WRONG_PASSWORD);
      default:
        throw createError(signInErrorCodes.ERROR_UNKNOWN);
    }
  }
};

export { signInWithEmailAndPassword, signInErrorCodes };

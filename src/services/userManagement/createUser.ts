import { auth } from "../fireConfig";
import { USER_MANAGEMENT, userManagementErrors } from "./constants";
// TODO: Add stronger password validation

const createUserErrors = {
  ERROR_EMAIL_ALREADY_USED: USER_MANAGEMENT + "/email-already-in-use",
  ERROR_EMAIL_NOT_VALID: USER_MANAGEMENT + "/invalid-email",
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNSUPPORTED_OPERATION: USER_MANAGEMENT + "/operation-not-allowed",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN,
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        throw createUserErrors.ERROR_EMAIL_ALREADY_USED;

      case "auth/invalid-email":
        throw createUserErrors.ERROR_EMAIL_NOT_VALID;

      case "auth/weak-password":
        throw createUserErrors.ERROR_WEAK_PASSWORD;

      case "auth/operation-not-allowed":
        throw createUserErrors.ERROR_UNSUPPORTED_OPERATION;

      default:
        throw createUserErrors.ERROR_UNKNOWN;
    }
  }
};

export { createUserWithEmailAndPassword, createUserErrors };

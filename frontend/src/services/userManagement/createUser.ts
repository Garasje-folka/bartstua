import { auth } from "../fireConfig";
import { USER_MANAGEMENT, userManagementErrorCodes } from "./constants";
import { createError } from "utils/src/helpers";
// TODO: Add stronger password validation

const createUserErrorCodes = {
  ERROR_EMAIL_ALREADY_USED: USER_MANAGEMENT + "/email-already-in-use",
  ERROR_EMAIL_NOT_VALID: USER_MANAGEMENT + "/invalid-email",
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNSUPPORTED_OPERATION: USER_MANAGEMENT + "/operation-not-allowed",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
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
        throw createError(createUserErrorCodes.ERROR_EMAIL_ALREADY_USED);

      case "auth/invalid-email":
        throw createError(createUserErrorCodes.ERROR_EMAIL_NOT_VALID);

      case "auth/weak-password":
        throw createError(createUserErrorCodes.ERROR_WEAK_PASSWORD);

      case "auth/operation-not-allowed":
        throw createError(createUserErrorCodes.ERROR_UNSUPPORTED_OPERATION);

      default:
        throw createError(createUserErrorCodes.ERROR_UNKNOWN);
    }
  }
};

export { createUserWithEmailAndPassword, createUserErrorCodes };

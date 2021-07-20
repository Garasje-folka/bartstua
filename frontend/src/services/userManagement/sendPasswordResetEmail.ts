import { createError } from "utils/dist/helpers";
import firebase, { auth } from "../fireConfig";
import { USER_MANAGEMENT, userManagementErrorCodes } from "./constants";

export const sendPasswordResetEmailErrors = {
  ERROR_INVALID_EMAIL: USER_MANAGEMENT + "/invalid-email",
  ERROR_USER_NOT_FOUND: USER_MANAGEMENT + "/user-not-found",
  ERROR_INVALID_CONTINUE_URL: USER_MANAGEMENT + "/invalid-continue-url",
  ERROR_UNAUTHORIZED_CONTINUE_URL:
    USER_MANAGEMENT + "/unauthorized-continue-url",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const sendPasswordResetEmail = async (email: string, continueUrl?: string) => {
  try {
    let action: firebase.auth.ActionCodeSettings | undefined;
    if (continueUrl) {
      action = {
        url: continueUrl,
      };
    }
    await auth.sendPasswordResetEmail(email, action);
  } catch (error) {
    console.log(error);
    switch (error.code) {
      case "auth/invalid-email":
        throw createError(sendPasswordResetEmailErrors.ERROR_INVALID_EMAIL);
      case "auth/invalid-continue-uri":
        throw createError(
          sendPasswordResetEmailErrors.ERROR_INVALID_CONTINUE_URL
        );
      case "auth/unauthorized-continue-uri":
        throw createError(
          sendPasswordResetEmailErrors.ERROR_UNAUTHORIZED_CONTINUE_URL
        );
      case "auth/user-not-found":
        throw createError(sendPasswordResetEmailErrors.ERROR_USER_NOT_FOUND);
      default:
        throw createError(sendPasswordResetEmailErrors.ERROR_UNKNOWN);
    }
  }
};

export { sendPasswordResetEmail };

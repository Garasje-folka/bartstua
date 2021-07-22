import { createError } from "utils/dist/helpers";
import { auth } from "../fireConfig";
import { userManagementErrorCodes, USER_MANAGEMENT } from "./constants";

export const confirmPasswordResetErrors = {
  ERROR_EXPIRED_CODE: USER_MANAGEMENT + "/expired-code",
  ERROR_INVALID_CODE: USER_MANAGEMENT + "/invalid-code",
  ERROR_USER_DISABLED: USER_MANAGEMENT + "/user-disabled",
  ERROR_USER_NOT_FOUND: USER_MANAGEMENT + "/user-not-found",
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const confirmPasswordReset = async (code: string, newPassword: string) => {
  try {
    await auth.confirmPasswordReset(code, newPassword);
  } catch (error) {
    switch (error.code) {
      case "auth/expired-action-code":
        throw createError(confirmPasswordResetErrors.ERROR_EXPIRED_CODE);
      case "auth/invalid-action-code":
        throw createError(confirmPasswordResetErrors.ERROR_INVALID_CODE);
      case "auth/user-disabled":
        throw createError(confirmPasswordResetErrors.ERROR_USER_DISABLED);
      case "auth/user-not-found":
        throw createError(confirmPasswordResetErrors.ERROR_USER_NOT_FOUND);
      case "auth/weak-password":
        throw createError(confirmPasswordResetErrors.ERROR_WEAK_PASSWORD);
      default:
        throw createError(confirmPasswordResetErrors.ERROR_UNKNOWN);
    }
  }
};

export { confirmPasswordReset };

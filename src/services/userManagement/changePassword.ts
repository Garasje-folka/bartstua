import { reauthenticate, reauthenticateErrors } from ".";
import { USER_MANAGEMENT, userManagementErrors } from "./constants";

const changePasswordErrors = {
  ...reauthenticateErrors,
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN_USER_MANAGEMENT,
};

const changePassword = (currentPassword: string, newPassword: string) => {
  return reauthenticate(currentPassword).then((user) => {
    // TODO: Unsure about having this error type
    if (!user) throw changePasswordErrors.ERROR_NO_USER;

    return user.updatePassword(newPassword).catch((error) => {
      switch (error.code) {
        case "auth/weak-password":
          throw changePasswordErrors.ERROR_WEAK_PASSWORD;
        default:
          throw changePasswordErrors.ERROR_UNKNOWN;
      }
    });
  });
};

export { changePassword, changePasswordErrors };

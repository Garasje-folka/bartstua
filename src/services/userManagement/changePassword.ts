import { auth } from "../fireConfig";
import { reauthenticate, reauthenticateErrors } from "./";
import { USER_MANAGEMENT, userManagementErrors } from "./constants";

const changePasswordErrors = {
  ...reauthenticateErrors,
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN,
};

const changePassword = async (currentPassword: string, newPassword: string) => {
  await reauthenticate(currentPassword);
  const user = auth.currentUser;
  if (!user) throw changePasswordErrors.ERROR_NO_USER;

  try {
    await user.updatePassword(newPassword);
  } catch (error) {
    switch (error.code) {
      case "auth/weak-password":
        throw changePasswordErrors.ERROR_WEAK_PASSWORD;
      default:
        throw changePasswordErrors.ERROR_UNKNOWN;
    }
  }
};

export { changePassword, changePasswordErrors };

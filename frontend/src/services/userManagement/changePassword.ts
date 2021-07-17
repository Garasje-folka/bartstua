import { auth } from "../fireConfig";
import { reauthenticate, reauthenticateErrorCodes } from ".";
import { USER_MANAGEMENT, userManagementErrorCodes } from "./constants";
import { createError } from "utils/dist/helpers";

const changePasswordErrorCodes = {
  ...reauthenticateErrorCodes,
  ERROR_WEAK_PASSWORD: USER_MANAGEMENT + "/weak-password",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const changePassword = async (currentPassword: string, newPassword: string) => {
  await reauthenticate(currentPassword);
  const user = auth.currentUser;
  if (!user) throw createError(changePasswordErrorCodes.ERROR_NO_USER);

  try {
    await user.updatePassword(newPassword);
  } catch (error) {
    switch (error.code) {
      case "auth/weak-password":
        throw createError(changePasswordErrorCodes.ERROR_WEAK_PASSWORD);
      default:
        throw createError(changePasswordErrorCodes.ERROR_UNKNOWN);
    }
  }
};

export { changePassword, changePasswordErrorCodes };

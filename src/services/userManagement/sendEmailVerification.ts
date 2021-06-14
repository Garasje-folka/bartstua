import { auth } from "../fireConfig";
import { userManagementErrors } from "./constants";
import { createError } from "./helpers/createError";

const sendEmailVerificationErrorCodes = {
  ERROR_NO_USER: userManagementErrors.ERROR_NO_USER,
  ERROR_UNKNOWN: userManagementErrors.ERROR_UNKNOWN,
};

const sendEmailVerification = async () => {
  const user = auth.currentUser;
  if (!user) throw createError(sendEmailVerificationErrorCodes.ERROR_NO_USER);

  try {
    await user.sendEmailVerification();
  } catch (error) {
    throw createError(sendEmailVerificationErrorCodes.ERROR_UNKNOWN);
  }
};

export { sendEmailVerification };

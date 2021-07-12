import firebase from "../fireConfig";
import { userManagementErrorCodes, USER_MANAGEMENT } from "./constants";
import { createError } from "utils/src/helpers";

const reauthenticateErrorCodes = {
  ERROR_NO_USER: userManagementErrorCodes.ERROR_NO_USER,
  ERROR_WRONG_PASSWORD: USER_MANAGEMENT + "/wrong-password",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const reauthenticate = async (password: string) => {
  const user = firebase.auth().currentUser;

  if (!user || !user.email)
    throw createError(reauthenticateErrorCodes.ERROR_NO_USER);
  const cred = firebase.auth.EmailAuthProvider.credential(user.email, password);

  try {
    await user.reauthenticateWithCredential(cred);
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        throw createError(reauthenticateErrorCodes.ERROR_WRONG_PASSWORD);
      default:
        throw createError(reauthenticateErrorCodes.ERROR_UNKNOWN);
    }
  }
};

export { reauthenticate, reauthenticateErrorCodes };

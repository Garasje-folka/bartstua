import { auth } from "../fireConfig";
import { userManagementErrorCodes, USER_MANAGEMENT } from "./constants";

const signInAnonymouslyErrorCodes = {
  ERROR_UNSUPPORTED_OPERATION: USER_MANAGEMENT + "/operation-not-allowed",
  ERROR_UNKNOWN: userManagementErrorCodes.ERROR_UNKNOWN,
};

const signInAnonymously = async () => {
  try {
    auth.signInAnonymously();
  } catch (error) {
    switch (error.code) {
      case "auth/operation-not-allowed": {
        throw new Error(
          signInAnonymouslyErrorCodes.ERROR_UNSUPPORTED_OPERATION
        );
      }
      default: {
        throw new Error(signInAnonymouslyErrorCodes.ERROR_UNKNOWN);
      }
    }
  }
};

export { signInAnonymously };

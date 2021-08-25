import { CallableContext } from "firebase-functions/lib/providers/https";
import * as functions from "firebase-functions";
import { SHARED_ERRORS } from "utils/dist/errors";

export const checkAuthentication = (auth: CallableContext["auth"]) => {
  if (!auth || !auth.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      SHARED_ERRORS.USER_UNAUTHENTICATED
    );
  }

  return auth;
};

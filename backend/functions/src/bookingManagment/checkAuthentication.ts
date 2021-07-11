import { CallableContext } from "firebase-functions/lib/providers/https";
import * as functions from "firebase-functions";

export const checkAuthentication = (auth: CallableContext["auth"]) => {
  if (!auth || !auth.uid) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "User is not authenticated"
    );
  }
};

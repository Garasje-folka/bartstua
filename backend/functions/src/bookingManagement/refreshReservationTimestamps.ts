import * as functions from "firebase-functions";
import { refreshReservationTimestampsHelper } from "./helpers";

export const refreshReservationTimestamps = functions.https.onCall(
  async (data, context) => {
    const auth = context.auth;
    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "user-unauthenticated"
      );
    }

    await refreshReservationTimestampsHelper(auth.uid);
  }
);

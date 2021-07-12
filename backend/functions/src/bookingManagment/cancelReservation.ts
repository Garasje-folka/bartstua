import * as functions from "firebase-functions";
import { deleteReservation } from "./deleteReservation";

// TODO: Typecheck data
export const cancelReservation = functions.https.onCall(
  async (data, context) => {
    const auth = context.auth;

    if (!auth || !auth.uid) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User is not authenticated"
      );
    }

    await deleteReservation(data.docid, auth.uid);
  }
);

import * as functions from "firebase-functions";
import { deleteReservation } from "./helpers";
import * as yup from "yup";
import { checkAuthentication, checkData } from "../helpers";

const dataSchema = yup.object({
  docid: yup.string().required(),
});

export const cancelReservation = functions.https.onCall(
  async (data, context) => {
    checkData(data, dataSchema);
    const auth = checkAuthentication(context.auth);

    await deleteReservation(data.docid, auth.uid);
  }
);

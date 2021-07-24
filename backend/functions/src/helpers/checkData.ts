import * as yup from "yup";
import * as functions from "firebase-functions";
import { SHARED_ERRORS } from "utils/dist/errors";

export const checkData = async (data: any, schema: yup.SchemaOf<any>) => {
  try {
    await schema.validate(data);
  } catch (error) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      SHARED_ERRORS.UNEXPECTED_DATA_FORMAT
    );
  }
};

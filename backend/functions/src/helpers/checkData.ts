import * as yup from "yup";
import * as functions from "firebase-functions";

export const checkData = async (data: any, schema: yup.SchemaOf<any>) => {
  try {
    await schema.validate(data);
  } catch (error) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Not the expected data format"
    );
  }
};

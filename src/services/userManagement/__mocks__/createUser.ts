import * as EmailValidator from "email-validator";
import { createUserErrors } from "../";

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!EmailValidator.validate(email)) {
    throw createUserErrors.ERROR_EMAIL_NOT_VALID;
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 200);
  });
};

export { createUserWithEmailAndPassword, createUserErrors };

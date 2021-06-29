import * as EmailValidator from "email-validator";
import { createUserErrorCodes } from "../";
import { createError } from "../helpers/createError";
import { User } from "shared/src/types";

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<User> => {
  if (!EmailValidator.validate(email)) {
    throw createError(createUserErrorCodes.ERROR_EMAIL_NOT_VALID);
  } else if (password.length < 6) {
    throw createError(createUserErrorCodes.ERROR_WEAK_PASSWORD);
  }
  // Hardcoded in taken email for now
  else if (email === "taken@hotmail.com") {
    throw createError(createUserErrorCodes.ERROR_EMAIL_ALREADY_USED);
  }

  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 200);
  });

  return {
    uid: "id",
    emailVerified: false,
    displayName: null,
    email: email,
  };
};

export { createUserWithEmailAndPassword, createUserErrorCodes };

import { signInErrorCodes } from "../";
import { userChangedCallback } from "./onCurrentUserChanged";
import * as EmailValidator from "email-validator";
import { createError } from "../helpers/createError";

const signInWithEmailAndPassword = async (email: string, password: string) => {
  if (!EmailValidator.validate(email)) {
    throw createError(signInErrorCodes.ERROR_INVALID_EMAIL);
  }
  // TODO: Hardcoded for now
  else if (email !== "taken@hotmail.com") {
    throw createError(signInErrorCodes.ERROR_USER_NOT_FOUND);
  } else if (email === "taken@hotmail.com" && password !== "Bestepassord123") {
    throw createError(signInErrorCodes.ERROR_WRONG_PASSWORD);
  }

  await new Promise((resolve) => {
    // TODO: Hardcoded for now. Add fake "existing" users for testing?
    const fakeUser = {
      uid: "id",
      emailVerified: true,
      displayName: null,
      email: email,
      sendEmailVerification: async () => {},
    };

    setTimeout(() => {
      if (userChangedCallback) userChangedCallback(fakeUser);
      resolve(fakeUser);
    }, 200);
  });
};

export { signInWithEmailAndPassword, signInErrorCodes };

import * as EmailValidator from "email-validator";
import { createUserErrors } from "../";

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!EmailValidator.validate(email)) {
    throw createUserErrors.ERROR_EMAIL_NOT_VALID;
  } else if (password.length < 6) {
    throw createUserErrors.ERROR_WEAK_PASSWORD;
  }
  // Hardcoded in taken email for now
  else if (email === "taken@hotmail.com") {
    throw createUserErrors.ERROR_EMAIL_ALREADY_USED;
  }

  await new Promise((resolve) => {
    const fakeUser = {
      uid: "id",
      emailVerified: false,
      displayName: null,
      email: email,
      sendEmailVerification: async () => {},
    };

    setTimeout(() => {
      resolve(fakeUser);
    }, 200);
  });
};

export { createUserWithEmailAndPassword, createUserErrors };

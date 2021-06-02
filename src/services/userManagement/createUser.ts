import { auth } from "../../fireConfig";

// TODO: Add stronger password validation

export const createUserErrors = {
  ERROR_EMAIL_ALREADY_USED: "auth/email-already-in-use",
  ERROR_EMAIL_NOT_VALID: "auth/invalid-email",
  ERROR_WEAK_PASSWORD: "auth/weak-password",
  ERROR_UNDEFINED: "undefined",
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential && userCredential.user) resolve(userCredential.user);
        else resolve(null);
      })
      .catch((error) => {
        switch (error.code) {
          case createUserErrors.ERROR_EMAIL_ALREADY_USED:
            reject(createUserErrors.ERROR_EMAIL_ALREADY_USED);
            break;

          case createUserErrors.ERROR_EMAIL_NOT_VALID:
            reject(createUserErrors.ERROR_EMAIL_NOT_VALID);
            break;

          case createUserErrors.ERROR_WEAK_PASSWORD:
            reject(createUserErrors.ERROR_WEAK_PASSWORD);
            break;

          default:
            reject(createUserErrors.ERROR_UNDEFINED);
            break;
        }
      });
  });
};

export { createUserWithEmailAndPassword };

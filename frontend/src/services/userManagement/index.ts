import {
  createUserWithEmailAndPassword,
  createUserErrorCodes,
} from "./createUser";
import { onCurrentUserChanged } from "./onCurrentUserChanged";
import { signInWithEmailAndPassword, signInErrorCodes } from "./signIn";
import { signOut } from "./signOut";
import { sendEmailVerification } from "./sendEmailVerification";
import { reauthenticate, reauthenticateErrorCodes } from "./reauthenticate";
import { changePassword, changePasswordErrorCodes } from "./changePassword";
import {
  sendPasswordResetEmail,
  sendPasswordResetEmailErrors,
} from "./sendPasswordResetEmail";
import {
  confirmPasswordReset,
  confirmPasswordResetErrors,
} from "./confirmPasswordReset";

export {
  createUserWithEmailAndPassword,
  createUserErrorCodes,
  onCurrentUserChanged,
  signInWithEmailAndPassword,
  signInErrorCodes,
  signOut,
  sendEmailVerification,
  reauthenticate,
  reauthenticateErrorCodes,
  changePassword,
  changePasswordErrorCodes,
  sendPasswordResetEmail,
  sendPasswordResetEmailErrors,
  confirmPasswordReset,
  confirmPasswordResetErrors,
};
export * as types from "./types";

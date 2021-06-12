import { auth } from "../fireConfig";

// TODO: Add error handling

const sendEmailVerification = async () => {
  await auth.currentUser?.sendEmailVerification();
};

export { sendEmailVerification };

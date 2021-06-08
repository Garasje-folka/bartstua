import { auth } from "../fireConfig";

const sendEmailVerification = async () => {
  return await auth.currentUser?.sendEmailVerification();
};

export { sendEmailVerification };

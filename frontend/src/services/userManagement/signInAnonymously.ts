import { auth } from "../fireConfig";

const signInAnonymously = async () => {
  try {
    await auth.signInAnonymously();
  } catch (error) {
    // TODO: Add error handling
    throw error;
  }
};

export { signInAnonymously };

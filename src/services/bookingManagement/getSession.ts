import parseDate from "./helpers/parseDate";
import { firestore } from "../fireConfig";
import { SESSIONS } from "./constants";

// TODO: Add error handling

const getSession = (date: Date) => {
  const sessionId = parseDate(date);
  return firestore.collection(SESSIONS).doc(sessionId).get();
};

export { getSession };

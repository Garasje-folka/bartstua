import { firestore, auth } from "../fireConfig";
import { SESSIONS } from "./constants";
import parseDate from "./helpers/parseDate";

const addBooking = async (date: Date) => {
  // Could take user as an argument instead
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  const sessionId = parseDate(date);

  const sessionRef = firestore.collection(SESSIONS).doc(sessionId);

  await sessionRef
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const participants = docSnapshot.get("participants");
        sessionRef.update({
          participants: [...participants, user.uid],
        });
      } else {
        sessionRef.set({
          participants: [user.uid],
        });
      }
    })
    .catch((error) => {
      // TODO: Error handling
      console.log(error);
    });
};

export { addBooking };

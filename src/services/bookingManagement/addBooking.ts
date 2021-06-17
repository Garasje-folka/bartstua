import { firestore, auth } from "../fireConfig";
import { MAX_EVENT_PARTICIPANTS, EVENTS } from "./constants";
import { getBookingEventId } from "./getBookingEventId";
import { DateHour } from "./interfaces";

const addBooking = async (dateHour: DateHour) => {
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  const eventId = getBookingEventId(dateHour);

  const eventRef = firestore.collection(EVENTS).doc(eventId);

  await eventRef
    .get()
    .then((docSnapshot) => {
      if (docSnapshot.exists) {
        const participants = docSnapshot.get("participants");
        if (participants.includes(user.uid)) {
          // TODO: Throw exception
          return;
        }
        if (participants.length >= MAX_EVENT_PARTICIPANTS) {
          // TODO: Throw exception
          return;
        }

        eventRef.update({
          participants: [...participants, user.uid],
        });
      } else {
        eventRef.set({
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

import { firestore, auth } from "../fireConfig";
import { createError } from "../userManagement/helpers/createError";
import { MAX_EVENT_SPACES, EVENTS, BOOKINGS } from "./constants";
import { getEventId } from "./getEventId";
import { DateHour } from "./interfaces";

const addBooking = async (dateHour: DateHour, spacesRequested: number) => {
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  // TODO: Throw error instead
  if (spacesRequested <= 0) return;

  try {
    const eventId = getEventId(dateHour);
    const eventRef = firestore.collection(EVENTS).doc(eventId);

    await firestore.runTransaction((transaction) => {
      return transaction.get(eventRef).then((docSnapshot) => {
        let eventSpacesTaken = docSnapshot.exists
          ? docSnapshot.get("spacesTaken")
          : 0;

        if (eventSpacesTaken + spacesRequested > MAX_EVENT_SPACES) {
          // TODO: Add proper error codes
          throw createError("NOT_ENOUGH_SPACE");
        }

        const newBookingRef = firestore.collection(BOOKINGS).doc();

        transaction.set(newBookingRef, {
          uid: user.uid,
          eventid: eventId,
          spaces: spacesRequested,
        });

        if (!docSnapshot.exists) {
          transaction.set(eventRef, {
            spacesTaken: spacesRequested,
          });
        } else {
          transaction.update(eventRef, {
            spacesTaken: eventSpacesTaken + spacesRequested,
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export { addBooking };

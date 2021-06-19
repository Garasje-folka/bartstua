import { firestore, auth } from "../fireConfig";
import { createError } from "../userManagement/helpers/createError";
import { MAX_EVENT_SPACES, EVENTS, BOOKINGS } from "./constants";
import { getEvent } from "./getEvent";
import { DateHour } from "./interfaces";

// TODO: Add proper error handling

const addBooking = async (date: DateHour, spacesRequested: number) => {
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  // TODO: Throw error instead
  if (spacesRequested <= 0) return;

  try {
    const event = await getEvent(date);
    const eventRef = event
      ? firestore.collection(EVENTS).doc(event.id)
      : firestore.collection(EVENTS).doc();

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
          eventid: eventRef.id,
          spaces: spacesRequested,
        });

        if (!docSnapshot.exists) {
          transaction.set(eventRef, {
            ...date,
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

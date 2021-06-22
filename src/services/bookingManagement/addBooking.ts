import firebase from "firebase";
import { firestore, auth } from "../fireConfig";
import { createError } from "../userManagement/helpers/createError";
import { BOOKINGS, EVENTS, MAX_EVENT_SPACES } from "./constants";
import { getEvent } from "./getEvent";
import { BookingData } from "./types";

// TODO: Add proper error handling

const addBooking = async (booking: BookingData) => {
  const call = firebase.functions().httpsCallable("addBooking");
  call(booking);

  /*
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  // TODO: Throw error instead
  if (booking.spaces <= 0) return;

  firestore.runTransaction(async (transaction) => {
    try {
      const event = await getEvent(booking.date);

      let spacesTaken: number = 0;

      if (event) {
        const eventRef = firestore.collection(EVENTS).doc(event.id);
        const docSnapshot = await transaction.get(eventRef);

        if (docSnapshot.exists) spacesTaken = docSnapshot.get("spacesTaken");
      }

      if (spacesTaken + booking.spaces > MAX_EVENT_SPACES) {
        throw createError("NOT_ENOUGH_SPACE");
      }

      const newBookingRef = firestore.collection(BOOKINGS).doc();

      transaction.set(newBookingRef, booking);
    } catch (error) {
      console.log(error);
    }
  });
  */
};

export { addBooking };

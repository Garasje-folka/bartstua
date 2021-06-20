import { firestore, auth } from "../fireConfig";
import { BookingData } from "./types";

// TODO: Add proper error handling

const addBooking = async (booking: BookingData) => {
  const user = auth.currentUser;

  // TODO: Throw error instead
  if (!user) return;

  // TODO: Throw error instead
  if (booking.spaces <= 0) return;

  await firestore.collection("bookings").add(booking);
};

export { addBooking };

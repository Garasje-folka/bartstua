import firebase from "firebase";
import { BookingRequest } from "utils";

// TODO: Add proper error handling

// Returns client secret which is used for payment
const addReservation = async (booking: BookingRequest) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    throw error;
  }
};

export { addReservation };

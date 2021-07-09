import firebase from "firebase";
import { BookingRequest } from "utils";

const addReservation = async (booking: BookingRequest) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    // TODO: Add proper error handling
    throw error;
  }
};

export { addReservation };

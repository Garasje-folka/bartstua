import firebase from "firebase";
import { BookingRequest } from "utils";

// TODO: Add proper error handling

const addReservation = async (booking: BookingRequest) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    console.log(error);
  }
};

export { addReservation };

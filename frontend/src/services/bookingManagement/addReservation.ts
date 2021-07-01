import firebase from "firebase";
import { BookingData } from "utils";

// TODO: Add proper error handling

const addReservation = async (booking: BookingData) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    console.log(error);
  }
};

export { addReservation };

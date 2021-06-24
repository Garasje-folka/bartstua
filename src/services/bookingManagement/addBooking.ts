import firebase from "firebase";
import { BookingData } from "./types";

// TODO: Add proper error handling

const addBooking = async (booking: BookingData) => {
  const call = firebase.functions().httpsCallable("addBooking");
  call(booking);
};

export { addBooking };

import firebase from "firebase";
import { BookingData } from "utils";
import { auth } from "../fireConfig";
import { signInAnonymously } from "../userManagement/signInAnonymously";

// TODO: Add proper error handling

const addBooking = async (booking: BookingData) => {
  const call = firebase.functions().httpsCallable("addBooking");
  try {
    await call(booking);
  } catch (error) {
    console.log(error);
  }
};

export { addBooking };

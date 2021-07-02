import firebase from "firebase";
import { BookingData } from "utils";
import { auth } from "../fireConfig";
import { signInAnonymously } from "../userManagement/signInAnonymously";

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

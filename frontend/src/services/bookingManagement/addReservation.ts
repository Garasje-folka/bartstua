import firebase from "firebase";
import { BookingRequest } from "utils";

// TODO: Add proper error handling

// Returns client secret which is used for payment
const addReservation = async (booking: BookingRequest): Promise<string> => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    const res = await call(booking);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { addReservation };

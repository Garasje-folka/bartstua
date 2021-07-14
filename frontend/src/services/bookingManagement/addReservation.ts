import firebase from "firebase";
import { ReservationRequest } from "utils/dist/bookingManagement/types";

const addReservation = async (booking: ReservationRequest) => {
  const call = firebase.functions().httpsCallable("addReservation");
  try {
    await call(booking);
  } catch (error) {
    // TODO: Add proper error handling
    throw error;
  }
};

export { addReservation };

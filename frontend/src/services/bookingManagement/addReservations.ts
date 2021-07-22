import firebase from "firebase";
import { BookingRequest } from "utils/dist/bookingManagement/types";

const addReservations = async (bookings: BookingRequest[]) => {
  const call = firebase.functions().httpsCallable("addReservations");

  // TODO: Rename maybe?
  const data = {
    reservations: bookings,
  };

  try {
    await call(data);
  } catch (error) {
    // TODO: Add proper error handling
    throw error;
  }
};

export { addReservations };

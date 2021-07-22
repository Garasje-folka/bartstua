import firebase from "firebase";
import { ReservationRequest } from "utils/dist/bookingManagement/types";

const addReservations = async (requests: ReservationRequest[]) => {
  const call = firebase.functions().httpsCallable("addReservations");
  // TODO: Rename maybe?
  const data = {
    requests: requests,
  };

  try {
    await call(data);
  } catch (error) {
    // TODO: Add proper error handling
    throw error;
  }
};

export { addReservations };

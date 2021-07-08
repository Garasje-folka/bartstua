import { auth, firestore } from "../fireConfig";
import { BookingData, firestoreConstants } from "utils";

const { RESERVATIONS } = firestoreConstants;

export const onReservationsChanged = (
  callback: (reservations: BookingData[]) => void
): (() => void) => {
  const reservationsRef = firestore
    .collection(RESERVATIONS)
    .where("uid", "==", auth.currentUser?.uid);

  const unsubscribe = reservationsRef.onSnapshot((querySnapshot) => {
    const reservations = querySnapshot.docs.map(
      (doc) => doc.data() as BookingData
    );
    callback(reservations);
  });
  return () => {
    unsubscribe();
  };
};

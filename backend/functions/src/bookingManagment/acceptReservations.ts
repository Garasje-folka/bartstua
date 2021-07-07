import * as admin from "firebase-admin";
import { BOOKINGS } from "./constants";

// This is probably just going to be a helper method
// that is used when the booking payment has been accepted
export const acceptReservations = async (
  reservations: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
): Promise<Array<string>> => {
  const batch = admin.firestore().batch();

  const bookingIds: Array<string> = [];
  reservations.forEach((doc) => {
    batch.delete(doc.ref);

    const newBookingRef = admin.firestore().collection(BOOKINGS).doc();
    bookingIds.push(newBookingRef.id);
    batch.set(newBookingRef, doc.data());
  });

  await batch.commit();

  return bookingIds;
};

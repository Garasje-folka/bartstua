import * as admin from "firebase-admin";
import { BOOKINGS, RESERVATIONS } from "utils/dist/bookingManagement/constants";
import { USERS } from "utils/dist/userManagement/constants";
import { PAYMENTS } from "../../paymentManagement/constants";

export const acceptReservations = async (
  transaction: FirebaseFirestore.Transaction,
  uid: string,
  userReservations: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) => {
  const bookingIds: Array<string> = [];
  userReservations.forEach((doc) => {
    // Deleting doc from reservations collection and user reservations collection
    const reservationRef = admin
      .firestore()
      .collection(RESERVATIONS)
      .doc(doc.id);

    transaction.delete(reservationRef);
    transaction.delete(doc.ref);

    // Create booking document
    const newBookingRef = admin.firestore().collection(BOOKINGS).doc();
    bookingIds.push(newBookingRef.id);

    const { timestamp, ...data } = doc.data();
    const bookingData = {
      ...data,
      uid: uid,
    };
    transaction.set(newBookingRef, bookingData);
  });

  const newPaymentRef = admin
    .firestore()
    .collection(USERS)
    .doc(uid)
    .collection(PAYMENTS)
    .doc();

  transaction.set(newPaymentRef, {
    bookings: bookingIds,
  });
};

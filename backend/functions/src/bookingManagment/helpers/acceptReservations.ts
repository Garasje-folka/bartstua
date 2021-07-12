import * as admin from "firebase-admin";
import { BOOKINGS } from "utils/dist/bookingManagement/constants";
import { PAYMENTS, STRIPE_CUSTOMERS } from "../../paymentManagement/constants";

// This is probably just going to be a helper method
// that is used when the booking payment has been accepted
export const acceptReservations = async (
  uid: string,
  reservations: FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
) => {
  const batch = admin.firestore().batch();

  const bookingIds: Array<string> = [];
  reservations.forEach((doc) => {
    batch.delete(doc.ref);

    const newBookingRef = admin.firestore().collection(BOOKINGS).doc();
    bookingIds.push(newBookingRef.id);
    batch.set(newBookingRef, doc.data());
  });

  const newPaymentRef = admin
    .firestore()
    .collection(STRIPE_CUSTOMERS)
    .doc(uid)
    .collection(PAYMENTS)
    .doc();

  batch.set(newPaymentRef, {
    bookings: bookingIds,
  });

  await batch.commit();
};

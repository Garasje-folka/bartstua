import { createTimestamp } from "utils/dist/bookingManagement/helpers";
import * as admin from "firebase-admin";
import { RESERVATIONS } from "utils/dist/bookingManagement/constants";

export const refreshReservationsTimestamp = (
  transaction: FirebaseFirestore.Transaction,
  userReservations: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]
) => {
  const currTimestamp = createTimestamp(0);
  userReservations.forEach((userRes) => {
    transaction.update(userRes.ref, {
      timestamp: currTimestamp,
    });

    const resRef = admin.firestore().collection(RESERVATIONS).doc(userRes.id);
    transaction.update(resRef, {
      timestamp: currTimestamp,
    });
  });
};

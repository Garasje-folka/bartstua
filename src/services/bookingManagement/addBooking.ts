// TODO: Don't know if we should use this...
import * as admin from "firebase-admin";

import { firestore, auth } from "../fireConfig";
import { SESSIONS } from "./constants";
import parseDate from "./helpers/parseDate";

const addBooking = (date: Date) => {
    // Could take user as an argument instead
    const user = auth.currentUser;
    if (!user) return;

    const sessionId = parseDate(date);

    const sessionRef = firestore.collection(SESSIONS).doc(sessionId);

    sessionRef.get()
    .then((docSnapshot) => {
        if (docSnapshot.exists) {
            sessionRef.update({
                users: admin.firestore.FieldValue.arrayUnion(user.uid)
            })
        }
        else {
            sessionRef.set({
                users: [user.uid]
            });
        }
    })
    .catch((error) => {
        console.log(error);
    })
}


export { addBooking };
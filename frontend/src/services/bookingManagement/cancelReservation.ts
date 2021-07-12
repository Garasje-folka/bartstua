import firebase from "firebase";

const cancelReservation = async (docid: string) => {
  const call = firebase.functions().httpsCallable("cancelReservation");
  const data = {
    docid: docid,
  };
  try {
    await call(data);
  } catch (error) {
    // TODO: Add proper error handling
    throw error;
  }
};

export { cancelReservation };

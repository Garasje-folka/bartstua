import firebase from "firebase";

const refreshReservationTimestamps = async () => {
  const call = firebase
    .functions()
    .httpsCallable("refreshReservationTimestamps");
  try {
    const res = await call();
  } catch (error) {
    // TODO: Error handling
    throw error;
  }
};

export { refreshReservationTimestamps };

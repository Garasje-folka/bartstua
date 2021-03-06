import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBcgFkOy3vclPjxeCYyHNMEi5-mWubqx1g",
  authDomain: "bartstua.firebaseapp.com",
  projectId: "bartstua",
  storageBucket: "bartstua.appspot.com",
  messagingSenderId: "612611631771",
  appId: "1:612611631771:web:b4401f8aea9951fc19743e",
  measurementId: "G-92KYL12HNF",
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const functions = firebase.functions();
export default firebase;

if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
  firestore.useEmulator("localhost", 8080);
  functions.useEmulator("localhost", 5001);
}

import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
export default firebase;

auth.useEmulator("http://localhost:9099");

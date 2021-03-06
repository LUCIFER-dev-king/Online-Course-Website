import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTZ5PTHx7iQKRKBiPZxB2lnLSWxigp9xM",
  authDomain: "e-learn-website.firebaseapp.com",
  projectId: "e-learn-website",
  storageBucket: "e-learn-website.appspot.com",
  messagingSenderId: "603258378276",
  appId: "1:603258378276:web:af9dd98ef70002161c20b1",
  measurementId: "G-19PJ2LPFPE",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const db = firebase.firestore();

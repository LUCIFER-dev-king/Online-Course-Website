import firebase from "firebase/app";
import "firebase/firestore";
import { v4 } from "uuid";
const db = firebase.firestore();

export const createPayment = () => {};

export const createOrder = (id, user) => {
  return db
    .collection("orders")
    .doc(user.uid)
    .set({
      email: user.email,
      isAdmin: user.isAdmin,
    })
    .then((doc) => {
      db.collection("orders")
        .doc(user.uid)
        .collection("courseList")
        .doc(v4())
        .set({
          courseId: id,
        });
      console.log("Order saved");
      return doc;
    });
};

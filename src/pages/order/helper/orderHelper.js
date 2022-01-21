import firebase from "firebase/compat/app";
import "firebase/firestore";
import { v4 } from "uuid";
import { db } from "../../../config/firebaseconfig";

export const createPayment = () => {};

export const createEnrollmentToUser = (courseIdList, user) => {
  db.collection("users")
    .doc(user.uid)
    .set(
      {
        courseIdList: courseIdList,
      },
      { merge: true }
    )

    .then((res) => {
      console.log("Courses saved to user enrollments");
    });
};

export const createOrder = (courseIdList, user, orderId) => {
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
        .doc(orderId)
        .set({
          courseIdList: courseIdList,
        });
      console.log("Order saved");
      return doc;
    });
};

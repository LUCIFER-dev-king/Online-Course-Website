import firebase from "firebase/compat/app";
import "firebase/firestore";
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

export const createOrder = (courseIdList, user, orderIdForDb) => {
  console.log(orderIdForDb);
  return db
    .collection("orders")
    .doc(user.uid)
    .set(
      {
        email: user.email,
        isAdmin: user.isAdmin,
        courseIdList: courseIdList,
        orderIdForDb: orderIdForDb,
      },
      { merge: true }
    )
    .then((doc) => {
      console.log("Order saved");
      return doc;
    });
};

export const removeCartList = (uid) => {
  db.collection("users")
    .doc(uid)
    .update({
      cartList: firebase.firestore.FieldValue.delete(),
    })
    .then(() => {
      console.log("Document successfully deleted!");

      return true;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

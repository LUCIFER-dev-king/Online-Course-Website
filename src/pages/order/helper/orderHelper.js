import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";

export const createEnrollmentToUser = (courseIdList, user) => {
  courseIdList.forEach((element) => {
    db.collection("users")
      .doc(user.uid)
      .update({
        courseIdList: firebase.firestore.FieldValue.arrayUnion(element),
      })
      .then((res) => {
        console.log("Courses saved to user enrollments");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
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

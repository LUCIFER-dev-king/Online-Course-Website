import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";
import firebase from "firebase/compat/app";

export const getListOfCartCourses = (id) => {
  return db
    .collection("courses")
    .doc(id)
    .get()
    .then((doc) => {
      var addId = { ...doc.data(), id: doc.id };
      return addId;
    });
};

export const getUserCart = (id) => {
  return db
    .collection("users")
    .doc(id)
    .get()
    .then((doc) => {
      return doc.data().cartList;
    });
};

export const removeCartItem = (uid, id) => {
  return db
    .collection("users")
    .doc(uid)
    .update({
      cartList: firebase.firestore.FieldValue.arrayRemove(id),
    })
    .then(() => {
      console.log("Document successfully deleted!");

      return true;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

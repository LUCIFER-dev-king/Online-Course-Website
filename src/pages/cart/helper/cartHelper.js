import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";

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

export const removeCartItem = (uid, cartId) => {
  return db
    .collection("users")
    .doc(uid)
    .collection("cart")
    .doc(cartId)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");

      return true;
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
};

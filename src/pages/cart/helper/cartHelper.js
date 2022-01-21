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
  var courseIdList = [];
  return db
    .collection("users")
    .doc(id)
    .collection("cart")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        courseIdList.push({ ...doc.data(), cartListId: doc.id });
      });
      return courseIdList;
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

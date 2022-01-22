import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";

export const getCourses = () => {
  var list = [];

  return db
    .collection("courses")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = { ...doc.data(), id: doc.id };
        list.push(addId);
      });
      return list;
    });
};

export const setUserInDb = (user) => {
  db.collection("users")
    .doc(user.uid)
    .set(user, { merge: true })
    .then(() => {
      console.log("User saved in DB!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

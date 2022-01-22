import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";

export const getCourses = (limitCourses) => {
  var list = [];

  return limitCourses
    ? db
        .collection("courses")
        .orderBy("courseName")
        .limit(1)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            var addId = { ...doc.data(), id: doc.id };
            list.push(addId);
          });
          return list;
        })
    : db
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

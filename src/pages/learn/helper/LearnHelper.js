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

export const getListOfUserCourses = (id) => {
  return db
    .collection("courses")
    .doc(id)
    .get()
    .then((doc) => {
      var addId = { ...doc.data(), id: doc.id };
      return addId;
    });
};

export const getEnrollments = (id) => {
  return db
    .collection("users")
    .doc(id)
    .get()
    .then((doc) => {
      return doc.data().courseIdList;
    });
};

export const setUserInDb = (user) => {
  db.collection("users")
    .doc(user.uid)
    .set(user)
    .then(() => {
      console.log("User saved in DB!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

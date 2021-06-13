import firebase from "firebase/app";
import "firebase/firestore";

export const getCourses = (limitCourses) => {
  const db = firebase.firestore();
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

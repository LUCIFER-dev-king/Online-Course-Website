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

const getListOfUserCourses = (id) => {
  const db = firebase.firestore();
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
  const db = firebase.firestore();
  var list = [];
  var courseIdList = [];
  return db
    .collection("orders")
    .doc(id)
    .collection("courseList")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        courseIdList.push(doc.data().courseId);
        getListOfUserCourses(doc.data().courseId).then((result) => {
          list.push(result);
        });
      });

      localStorage.setItem("userEnrollments", JSON.stringify(courseIdList));
      return list;
    });
};

export const getSyllabus = (id) => {
  const db = firebase.firestore();
  var list = [];
  return db
    .collection("courses")
    .doc(id)
    .collection("videos")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = { ...doc.data(), sectionName: doc.id };
        list.push(addId);
      });
      return list;
    });
};

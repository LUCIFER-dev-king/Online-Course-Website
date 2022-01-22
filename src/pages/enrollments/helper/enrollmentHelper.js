import { db } from "../../../config/firebaseconfig";

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

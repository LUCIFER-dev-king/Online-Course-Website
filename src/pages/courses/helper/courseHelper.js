import { db } from "../../../config/firebaseconfig";

export const getCourses = async () => {
  var list = [];
  return db
    .collection("courses")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = { ...doc.data(), id: doc.id };
        list.push(addId);
      });
      console.log(list);
      return list;
    });
};

export const getFilterCourses = (level) => {
  //If any these not selected level, rating, language, the values are set higher so it
  //gives all courses. ex: level=4 if not selected then below 4 is going to be get selected,
  //which means all courses.
  var list = [];
  return db
    .collection("courses")
    .where("level", "<=", level)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = { ...doc.data(), id: doc.id };
        list.push(addId);
      });
      return list;
    });
};

// if (userCourseList.length !== 0) {
//     setCourseList(userCourseList);
//     setUserEnrollments(true);
//   } else {
//     var list = [];
//     db.collection("courses")
//       .get()
//       .then((snap) => {
//         snap.forEach((doc) => {
//           var addId = { ...doc.data(), id: doc.id };
//           list.push(addId);
//         });
//         setCourseList(list);
//       });
//   }

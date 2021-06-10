// import firebase from "firebase/app";
// import "firebase/firestore";
// import { v4 } from "uuid";
// const db = firebase.firestore();

// export const createCourse = (courseName, courseDesc, coursePrice) => {
//   db.collection("courses")
//     .doc(v4())
//     .set({
//       courseName: courseName,
//       courseDesc: courseDesc,
//       coursePrice: coursePrice,
//     })
//     .then((doc) => {
//       console.log("Course saved", doc);
//     })
//     .catch((err) => {
//       console.log("Error:", err);
//     });
// };

import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "../../../config/firebaseconfig";
import { v4 } from "uuid";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const createVideoCollection = (docId, videoName, sectionName) => {
  db.collection("courses")
    .doc(docId)
    .collection("videos")
    .doc(sectionName)
    .set({
      videoName: videoName,
      finishedProcessing: false,
    })
    .then(() => {
      console.log("video saved");
    })
    .catch((err) => {
      console.log("Error occured", err);
    });
};

export const createCourse = (
  courseName,
  courseDesc,
  coursePrice,
  videoName,
  sectionName
) => {
  var docId = v4();
  db.collection("courses")
    .doc(docId)
    .set({
      courseName: courseName,
      courseDesc: courseDesc,
      coursePrice: coursePrice,
    })
    .then((doc) => {
      console.log("Course saved", docId);
      createVideoCollection(docId, videoName, sectionName);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

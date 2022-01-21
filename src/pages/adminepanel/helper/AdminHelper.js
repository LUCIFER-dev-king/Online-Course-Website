import firebase from "firebase/compat/app";
import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";
import { readAndCompressImage } from "browser-image-resizer";
import { imageConfig } from "../../../config/imageConfig";
import { v4 } from "uuid";

const createVideoCollection = (docId, videoName, sectionName) => {
  var sectionId = v4();
  var dbRef = db.collection("courses").doc(docId);

  dbRef
    .collection("sections")
    .doc(sectionId)
    .set({
      sectionName: sectionName,
    })
    .then(() => {
      dbRef.collection("sections").doc(sectionId).collection("videos").add({
        videoName: videoName,
        finishedProcessing: false,
      });
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
  sectionName,
  courseTagLine,
  authorDesc,
  authorName,
  profilePicUrl,
  courseDiscount,
  thumbnailUrl
) => {
  var docId = v4();
  db.collection("courses")
    .doc(docId)
    .set({
      courseName: courseName,
      courseDesc: courseDesc,
      coursePrice: coursePrice,
      courseTagLine: courseTagLine,
      authorDesc: authorDesc,
      authorName: authorName,
      profilePicUrl: profilePicUrl,
      courseDiscount: courseDiscount,
      thumbnailUrl: thumbnailUrl,
    })
    .then((doc) => {
      console.log("Course saved", doc);
      createVideoCollection(docId, videoName, sectionName);
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

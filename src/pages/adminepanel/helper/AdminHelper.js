import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";
import { v4 } from "uuid";
import "firebase/storage";

const createVideoCollection = (
  docId,
  videoName,
  sectionName,
  uploadedVideoUrl
) => {
  var sectionId = v4();
  var dbRef = db.collection("courses").doc(docId);

  return new Promise((resolve) => {
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
          videoUrl: uploadedVideoUrl,
        });
        resolve();
      })
      .catch((err) => {
        console.log("Error occured", err);
      });
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
  thumbnailUrl,
  uploadedVideoUrl
) => {
  var docId = v4();
  return db
    .collection("courses")
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
      level: 1,
      rating: 2,
    })
    .then(async (doc) => {
      return await createVideoCollection(
        docId,
        videoName,
        sectionName,
        uploadedVideoUrl
      );
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};

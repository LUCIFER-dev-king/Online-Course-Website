import "firebase/firestore";
import { db } from "../../../config/firebaseconfig";

export const getVideoList = (courseId, sectionId) => {
  var videoList = [];
  return db
    .collection("courses")
    .doc(courseId)
    .collection("sections")
    .doc(sectionId)
    .collection("videos")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        videoList.push(doc.data());
      });
      return videoList;
    });
};

export const getSyllabus = (id) => {
  var list = [];
  return db
    .collection("courses")
    .doc(id)
    .collection("sections")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = doc.id;
        list.push({ ...doc.data(), sectionId: addId });
      });
      return list;
    });
};

export const setReviews = (id, userDisplayName, starCount, reviewDesc) => {
  return db
    .collection("courses")
    .doc(id)
    .collection("reviews")
    .add({
      name: userDisplayName,
      star: starCount,
      review: reviewDesc,
    })
    .then((res) => {
      console.log("Document successfully written!");
      return res.data();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const getReviews = (id) => {
  let reviewsList = [];
  return db
    .collection("courses")
    .doc(id)
    .collection("reviews")
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        reviewsList.push(doc.data());
      });
      return reviewsList;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const getFilterReviews = (id, starCount) => {
  let reviewsList = [];
  return db
    .collection("courses")
    .doc(id)
    .collection("reviews")
    .where("star", "==", Number(starCount))
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        reviewsList.push(doc.data());
      });
      return reviewsList;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const addToCart = (uid, courseId) => {
  return db
    .collection("users")
    .doc(uid)
    .set(
      {
        cartList: [courseId],
      },
      { merge: true }
    )
    .then((res) => {
      console.log("Saved to cart");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

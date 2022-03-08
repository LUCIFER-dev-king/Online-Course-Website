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

export const getFilterCourses = (level, star) => {
  /*
    1. Level is (1, 2, 3) for (newbie, intermediate, advanced) respectively. For each 
       level we mapped levelSetting. Using levelSetting, the inputArrayList interepets
       each level count.
    2. If user click and unclick the previous to fetch courses is undefined so
       previousFilteredLevel is used which get each level after user click and restore
       when user unclick.
    3. Same goes review.
    4. Firestore did allow different fields to make compound queries so the courses are
       filtered from again after level response.

       FIXME:But the cavet is that the level must be selected to filter courses.
  */

  var list = [];
  return db
    .collection("courses")
    .where("level", "<=", level)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        var addId = { ...doc.data(), id: doc.id };
        if (doc.data().rating <= star) {
          list.push(addId);
        }
      });
      return list;
    });
};

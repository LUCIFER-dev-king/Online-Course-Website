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

export const getFilterCourses = (levelArr, reviewArr) => {
  //We can't make queries same index like : .where('level', '==', '2').where('level', '==', '3')
  // There is no such query exists firebase to do that Logical OR operation
  // Firebase team mentioned clearly docs.
  // https://firebase.google.com/docs/firestore/query-data/queries?hl=en&authuser=0#query_limitations

  //levelArr has level and revewArr has reviews. We just check whether the course level and
  // review is present inside levelarr and reviewarr.

  var list = [];

  return db
    .collection("courses")
    .get()
    .then(async (snap) => {
      snap.forEach((doc) => {
        //What if user didn't selected reviw and level. At that time we need to send all course.
        if (levelArr.length === 0 && reviewArr.length === 0) {
          list.push({ ...doc.data(), id: doc.id });
        }

        //What if user clicked both level and review
        if (levelArr.length > 0 && levelArr.includes(doc.data().level)) {
          if (reviewArr.length > 0 && reviewArr.includes(doc.data().rating)) {
            list.push({ ...doc.data(), id: doc.id });
          }
          //What if user clicked only level
          else if (reviewArr.length === 0) {
            list.push({ ...doc.data(), id: doc.id });
          }
        }
        //What if user clicked both review first instead of level
        else if (
          reviewArr.length > 0 &&
          reviewArr.includes(doc.data().rating)
        ) {
          if (levelArr.length > 0 && levelArr.includes(doc.data().level)) {
            list.push({ ...doc.data(), id: doc.id });
          } else if (levelArr.length === 0) {
            list.push({ ...doc.data(), id: doc.id });
          }
        }
      });

      return list;
    });
};

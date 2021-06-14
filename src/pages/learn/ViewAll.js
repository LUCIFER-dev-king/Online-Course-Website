import React, { useState, useEffect, useContext } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./learn.css";
import firebase from "firebase/app";
import "firebase/firestore";
import ExpandedCard from "../../component/ExpandedCard";
import { CourseContext } from "../../context/coursecontext/CouseContext";

const ViewAll = () => {
  const db = firebase.firestore();
  const [courseList, setCourseList] = useState([]);
  const { state } = useContext(CourseContext);
  const { userCourseList } = state;
  const [userEnrollments, setUserEnrollments] = useState(false);

  const getCourses = () => {
    if (userCourseList.length !== 0) {
      setCourseList(userCourseList);
      setUserEnrollments(true);
    } else {
      var list = [];
      db.collection("courses")
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            var addId = { ...doc.data(), id: doc.id };
            list.push(addId);
          });
          setCourseList(list);
        });
    }
  };

  useEffect(() => {
    getCourses();
  }, [courseList]);
  return (
    <div>
      <Header />
      <div className='learnContainer'>
        <div id='navigation' className='mt-4'>
          <h6>
            <a href=''>Store</a>
            <span> / </span>
            <a href=''>Courses</a>
          </h6>
        </div>
        <section id='courses' className='mt-3'>
          <h3>Courses</h3>
          <div id='couseList' className='m-1'>
            {courseList.map((course, id) => {
              return (
                <ExpandedCard
                  key={id}
                  courses={course}
                  userCourses={userEnrollments}
                ></ExpandedCard>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewAll;

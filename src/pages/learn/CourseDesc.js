import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./learn.css";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import Accordian from "../../component/Accordian";
import CourseInfo from "../../component/CourseInfo";

const CourseDesc = () => {
  const db = firebase.firestore();
  const location = useLocation();
  const history = useHistory();
  const [syllabusList, setSyllabusList] = useState([]);
  const { courseName, courseDesc, coursePrice, id } = location.state.course;

  const getSyllabus = (id) => {
    var list = [];
    db.collection("courses")
      .doc(id)
      .collection("videos")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var addId = { ...doc.data(), sectionName: doc.id };
          list.push(addId);
        });
        setSyllabusList(list);
      });
  };

  useEffect(() => {
    getSyllabus(id);
  }, []);

  return (
    <div>
      <Header />
      <div className='learnContainer'>
        <div id='navigation' className='mt-4'>
          <h6>
            <a href=''>Store</a>
            <span> / </span>
            <a href=''>Courses</a>
            <span> / </span>
            <a href=''>{courseName}</a>
          </h6>
        </div>

        <CourseInfo
          course={location.state.course}
          syllabus={syllabusList}
          fromVideoPlayer={true}
        />
      </div>
    </div>
  );
};

export default CourseDesc;

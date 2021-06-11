import React, { useState, useEffect } from "react";
import Header from "./Header";
import "./learn.css";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";

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

  const sendToCourseVideoPlayer = () => {
    history.push({
      pathname: `/learn/${courseName}/syllabus`,
      state: {
        course: location.state.course,
        syllabus: syllabusList,
      },
    });
  };
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
            <a href=''>Course Name</a>
          </h6>
        </div>

        <div className='row'>
          <div className='col-md-8'>
            <div className='course-header'>
              <h2>{courseName}</h2>
            </div>
            <div className='course-desc'>
              <p>{courseDesc}</p>
            </div>
            <div className='course-syllabus mt-4'>
              <h3>Syllabus</h3>
              <div className='accordion ' id='accordionExample'>
                <div class='accordion-item'>
                  <h2 class='accordion-header' id='headingOne'>
                    <button
                      class='accordion-button'
                      type='button'
                      data-bs-toggle='collapse'
                      data-bs-target='#collapseOne'
                      aria-expanded='true'
                      aria-controls='#collapseOne'
                    >
                      Accordion Item #1
                    </button>
                  </h2>
                  <div
                    id='collapseOne'
                    class='accordion-collapse'
                    aria-labelledby='headingOne'
                    data-bs-parent='accordionExample'
                  >
                    <div class='accordion-body'>
                      <strong>This is the first item's accordion body.</strong>
                      It is shown by default, until the collapse plugin adds the
                      appropriate classes that we use to style each element.
                      These classes control the overall appearance, as well as
                      the showing and hiding via CSS transitions. You can modify
                      any of this with custom CSS or overriding our default
                      variables. It's also worth noting that just about any HTML
                      can go within the <code>.accordion-body</code>, though the
                      transition does limit overflow.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='course-author mt-4'>
              <h4>Author</h4>
              <div className='row'>
                <div className='col-1'>
                  <FaUser className='profile-icon' />
                </div>
                <div className='col-6 d-flex align-items-center'>
                  <h6>Author Name</h6>
                </div>
              </div>

              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Consequuntur consectetur suscipit earum atque quos fuga iste
                quis accusamus, beatae labore?
              </p>
            </div>
            <div className='course-abt my-5'>
              <h4>About This Course</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className='course-faq'>
              <h4>FAQ</h4>
              <div className='course-faq-title'>
                <strong>01 Lorem ipsum dolor sit amet?</strong>
              </div>
              <div className='course-faq-ans'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
                quis?
              </div>
            </div>
          </div>
          <div className='col-md-4 courseCard'>
            <div className='card m-2' style={{ width: "18rem" }}>
              <img
                className='card-img-top img-fluid'
                src='https://source.unsplash.com/random'
                alt='courseImg'
              ></img>
              <div className='card-body'>
                <h5 className='card-title'>{courseName}</h5>
                <p className='card-text'>{courseDesc}</p>
                <p>{coursePrice}</p>
                <button
                  type='button'
                  style={{ width: "100%" }}
                  className='btn btn-primary btn-block'
                  onClick={sendToCourseVideoPlayer}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDesc;

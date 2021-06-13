import React from "react";
import { FaUser } from "react-icons/fa";
import Accordian from "./Accordian";
import { useHistory } from "react-router-dom";

const CourseInfo = ({ course, syllabus, fromVideoPlayer }) => {
  const history = useHistory();
  const { courseName, courseDesc, coursePrice, id } = course;
  const infoClassName = fromVideoPlayer ? "col-md-8" : "col-md-12";

  const sendToCourseVideoPlayer = () => {
    history.push({
      pathname: `/learn/${courseName}/syllabus`,
      state: {
        course: course,
        syllabus: syllabus,
      },
    });
  };

  return (
    <div className='row'>
      <div className={infoClassName}>
        <div className='course-header'>
          <h2>{courseName}</h2>
        </div>
        <div className='course-desc'>
          <p>{courseDesc}</p>
        </div>

        {fromVideoPlayer ? (
          syllabus.map((syllabus, id) => (
            <Accordian key={id} syllabus={syllabus}></Accordian>
          ))
        ) : (
          <div></div>
        )}

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
            Consequuntur consectetur suscipit earum atque quos fuga iste quis
            accusamus, beatae labore?
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
      {fromVideoPlayer ? (
        <div className='col-md-4 courseCard'>
          <div className='card m-2' style={{ width: "18rem" }}>
            <img
              className='card-img-top img-fluid'
              src='https://source.unsplash.com/random'
              alt='courseImg'
            ></img>
            <div className='card-body'>
              <h5 className='card-title'>Lorem ipsum dolor sit amet.</h5>
              <p className='card-text'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Maiores, ab?
              </p>
              <p>150</p>
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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CourseInfo;

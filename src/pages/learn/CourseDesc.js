import React from "react";
import Header from "./Header";
import "./learn.css";
const CourseDesc = () => {
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
              <h2>Course Name</h2>
            </div>
            <div className='course-desc'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                porro?
              </p>
            </div>
            <div className='course-syllabus mt-4'>
              <h3>Syllabus</h3>
            </div>

            <div className='course-author mt-4'>
              <h4>Author</h4>
              <h6 className='mt-4'>Author Name</h6>
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
                <h5 className='card-title'>Lorem ipsum dolor sit amet.</h5>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ab?
                </p>
                <p>150</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDesc;

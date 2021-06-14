import React, { useContext } from "react";
import Accordian from "./Accordian";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/Context";

const CourseInfo = ({ course, syllabus, fromVideoPlayer }) => {
  const context = useContext(UserContext);
  const history = useHistory();
  var user = localStorage.getItem("user");
  var price;
  const {
    courseName,
    courseDesc,
    coursePrice,
    id,
    courseTagLine,
    courseDiscount,
    authorName,
    profilePicUrl,
    thumbnailUrl,
    authorDesc,
  } = course;
  const infoClassName = fromVideoPlayer ? "col-md-8" : "col-md-12";

  const sendToCourseVideoPlayer = () => {
    console.log(context.user?.uid);
    if (user) {
      history.push({
        pathname: `/learn/:courseName/syllabus`,
        state: {
          course: course,
          syllabus: syllabus,
        },
      });
    } else {
      history.push({
        pathname: `/learn/${courseName}/order`,
        state: {
          course: course,
        },
      });
    }
  };

  return (
    <div className='row'>
      <div className={infoClassName}>
        <div className='course-header pt-3'>
          <h2>{courseName}</h2>
        </div>
        <div className='course-desc pt-1'>
          <p>{courseTagLine}</p>
        </div>

        {fromVideoPlayer ? (
          syllabus.map((syllabus, id) => (
            <Accordian key={id} syllabus={syllabus}></Accordian>
          ))
        ) : (
          <div></div>
        )}

        <div className='course-author mt-4 pt-3'>
          <h4>Author</h4>
          <div className='row'>
            <div className='d-flex'>
              <div className=''>
                <img
                  src={profilePicUrl}
                  alt='img'
                  class='img-rounded'
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className='mx-3 my-auto'>
                <h6>{authorName}</h6>
              </div>
            </div>
          </div>

          <p className='pt-2'>{authorDesc}</p>
        </div>
        <div className='course-abt my-5'>
          <h4>About This Course</h4>
          <p>{courseDesc}</p>
        </div>
        <div className='course-faq'>
          <h4>FAQ</h4>
          <div className='course-faq-title mt-3'>
            <h5>01 Lorem ipsum dolor sit amet?</h5>
          </div>
          <div className='course-faq-ans mt-1 px-4 py-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            quisquam laudantium cupiditate voluptatum nam aliquid, distinctio
            non vel maxime architecto!
          </div>
          <div className='course-faq-title mt-3'>
            <h5>
              02 Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eligendi, laborum.
            </h5>
          </div>
          <div className='course-faq-ans mt-1 px-4 py-2'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
            temporibus aut dolor dolorem eveniet alias? Perspiciatis a
            quibusdam, quaerat minima quos nemo nam quis, aut in eveniet, illo
            dicta? Mollitia?
          </div>
          <div className='course-faq-title mt-3'>
            <h5>03 Lorem ipsum dolor sit amet?</h5>
          </div>
          <div className='course-faq-ans mt-1 px-4 py-2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate
            facere sapiente qui fuga quasi ab.
          </div>
          <div className='course-faq-title mt-3 '>
            <h5>04 Lorem ipsum dolor sit amet?</h5>
          </div>
          <div className='course-faq-ans mt-1 px-4 py-2'>
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
              src={thumbnailUrl}
              alt='courseImg'
            ></img>
            <div className='card-body'>
              <h5 className='card-title'>{courseName}</h5>
              <p className='card-text'>{courseTagLine}</p>

              <div className='d-flex '>
                <p className='px-1'>
                  <del>{coursePrice}</del>
                </p>
                <p className='px-2'>
                  {Math.floor(
                    (price = coursePrice - (coursePrice * courseDiscount) / 100)
                  )}
                </p>
                <p>{courseDiscount}% off</p>
              </div>

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

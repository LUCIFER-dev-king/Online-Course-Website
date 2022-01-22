import React from "react";
import { useHistory } from "react-router-dom";
import { addToCart } from "./helper/courseDescHelper";

const CourseInfo = ({
  course,
  syllabus,
  isUserEnrolled,
  isCourseAddedToCart,
}) => {
  const history = useHistory();

  const {
    courseName,
    coursePrice,
    id,
    courseTagLine,
    courseDiscount,
    thumbnailUrl,
  } = course;
  var user = JSON.parse(localStorage.getItem("user"));

  const sendToCourseVideoPlayer = () => {
    if (user) {
      if (isUserEnrolled) {
        history.push({
          pathname: `/learn/${courseName}/syllabus`,
          state: {
            course: course,
            syllabus: syllabus,
          },
        });
      } else {
        var courseList = [];
        courseList.push(course);
        history.push({
          pathname: "/learn/courses/order",
          state: {
            courseList: courseList,
            syllabus: syllabus,
          },
        });
      }
    } else {
      history.push("/signin");
    }
  };

  const addToCartHandler = () => {
    if (user != null) {
      addToCart(user.uid, id).then((res) => {
        history.push("/mycart");
      });
    } else {
      history.push("/signin");
    }
  };

  return (
    <div className="course-info-card ">
      <div
        className="card m-2"
        style={{
          width: "18rem",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <img className="card-img-top img-fluid" src={thumbnailUrl} alt=""></img>
        <div className="card-body">
          <h5 className="card-title fw-bolder">{courseName}</h5>
          <p className="card-text">{courseTagLine}</p>

          <div className="d-flex mt-2">
            <p className="px-1">
              <del>₹{coursePrice}</del>
            </p>
            <p className="px-2 fw-bolder">
              ₹{Math.floor(coursePrice - (coursePrice * courseDiscount) / 100)}
            </p>
            <p>{courseDiscount}% off</p>
          </div>

          {isUserEnrolled ? (
            <div
              onClick={sendToCourseVideoPlayer}
              style={{ cursor: "pointer" }}
              className="bg-light border border-dark mt-3 text-center w-100 text-dark px-4 py-2 fw-bold"
            >
              Start Now
            </div>
          ) : (
            <div className="d-flex w-100 flex-column">
              <div
                onClick={sendToCourseVideoPlayer}
                style={{ cursor: "pointer" }}
                className="bg-light border border-dark mt-3 text-center w-100 text-dark px-4 py-2 fw-bold"
              >
                Buy now
              </div>
              {!isCourseAddedToCart ? (
                <div
                  onClick={addToCartHandler}
                  style={{ cursor: "pointer" }}
                  className="bg-dark mt-3 text-center w-100 text-light px-4 py-2 fw-bold"
                >
                  Add to cart
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;

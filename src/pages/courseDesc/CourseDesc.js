import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "firebase/firestore";
import { auth } from "../../config/firebaseconfig";
import AccordianCard from "../../component/AccordianCard";
import CourseInfo from "./CourseInfo";
import { Accordion } from "react-bootstrap";

import {
  getReviews,
  getSyllabus,
  setReviews,
  getVideoList,
  getFilterReviews,
} from "./helper/courseDescHelper";
import Base from "../../layout/Base";
import { FaStar } from "react-icons/fa";
import ReviewCard from "../../component/ReviewCard";
import { getEnrollments } from "../enrollments/helper/enrollmentHelper";
import { getUserCart } from "../cart/helper/cartHelper";

const CourseDesc = () => {
  const history = useHistory();

  const location = useLocation();
  const [syllabusList, setSyllabusList] = useState([]);
  const [reviewDesc, setReviewDesc] = useState("");
  const [starCount, setStarCount] = useState(0);
  const [revealReviewSection, setRevealReviewSection] = useState(false);
  const [courseReviewList, setCourseReviewList] = useState([]);
  const [isUserEnrolled, setIsUserEnrolled] = useState(false);
  const [isCourseAddedToCart, setIsCourseAddedToCart] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");
  if (location.state === undefined) {
    history.goBack();
  }
  const {
    courseName,
    courseDesc,
    id,
    courseTagLine,
    authorName,
    profilePicUrl,
    authorDesc,
  } = location.state.course;
  var user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getSyllabus(id).then((result) => {
      result.forEach((res) => {
        var addIn;
        getVideoList(id, res.sectionId).then((doc) => {
          addIn = { ...res, videoList: doc };
          setSyllabusList((prev) => [...prev, addIn]);
        });
      });
      console.log(syllabusList);
    });

    getReviews(id).then((res) => {
      setCourseReviewList(res);
    });

    if (user !== null) {
      console.log(auth.currentUser);
      if (auth.currentUser !== null) {
        setUserDisplayName(auth.currentUser.displayName);
      }

      getEnrollments(user.uid).then((res) => {
        if (res !== undefined) {
          setIsUserEnrolled(res.find((ele) => ele === id));
        }
      });

      getUserCart(user.uid).then((res) => {
        if (res !== undefined) {
          setIsCourseAddedToCart(res.find((ele) => ele === id));
        }
      });
    }
  }, []);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    setReviews(
      id,
      userDisplayName === "" ? "Ramesh" : userDisplayName,
      starCount,
      reviewDesc
    ).then(() => {
      setRevealReviewSection((prev) => !prev);
      getReviews(id).then((res) => {
        setCourseReviewList(res);
      });
    });
  };

  const reviewFilterHandler = (e) => {
    e.preventDefault();
    getFilterReviews(id, e.target.value).then((res) => {
      console.log(res);
      setCourseReviewList(res);
    });
  };

  return (
    <Base>
      <div className="container">
        <div className="w-100 mt-5 d-md-flex flex-column flex-lg-row justify-content-between">
          <div id="course-desc-card">
            <CourseInfo
              course={location.state.course}
              syllabus={syllabusList}
              isUserEnrolled={isUserEnrolled}
              isCourseAddedToCart={isCourseAddedToCart}
            />
          </div>
          <div id="course-desc" className="pb-5">
            <div className=" pt-3">
              <h2 className="fw-bold">{courseName}</h2>
            </div>
            <div className="pt-1">
              <p>{courseTagLine}</p>
            </div>

            {syllabusList.length > 0
              ? syllabusList.map((syllabus, id) => (
                  <Accordion key={id} defaultActiveKey="0">
                    <AccordianCard
                      syllabus={syllabus}
                      isCallFromCourseDesc={true}
                    ></AccordianCard>
                  </Accordion>
                ))
              : ""}

            <div className="mt-4 pt-3">
              <h4 className="fw-bold">Author</h4>
              <div className="row">
                <div className="d-flex">
                  <div className="">
                    <img
                      src={profilePicUrl}
                      alt="img"
                      className="img-rounded"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="mx-3 my-auto">
                    <h5 className="fw-bolder">{authorName}</h5>
                  </div>
                </div>
              </div>

              <p className="pt-2">{authorDesc}</p>
            </div>
            <div className="my-5">
              <h4 className="fw-bolder">About This Course</h4>
              <p>{courseDesc}</p>
            </div>

            <div className="d-flex justify-content-between">
              <h4 className="fw-bolder">Reviews</h4>
              <div className="d-flex">
                <select
                  className="me-3 p-2 border-0"
                  style={{ outline: "none", cursor: "pointer" }}
                  name="reviewsFilter"
                  id="reviewsFilter"
                  onChange={reviewFilterHandler}
                >
                  <option value="5">Five star</option>
                  <option value="4">Four star</option>
                  <option value="3">Three star</option>
                  <option value="2">Two star</option>
                  <option value="1">One star</option>
                </select>
                {isUserEnrolled ? (
                  <div
                    style={{ cursor: "pointer" }}
                    className="bg-dark text-light px-4 py-2 fw-bold"
                    onClick={() => {
                      setRevealReviewSection((prev) => !prev);
                    }}
                  >
                    Write a Review
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {revealReviewSection ? (
              <div className="w-100  d-flex flex-column justify-content-start">
                <div className="fw-bolder mt-4">Your Rating</div>
                <div className="d-flex mt-1 align-items-center">
                  <FaStar
                    onClick={() => {
                      setStarCount(1);
                    }}
                    color={starCount >= 1 ? "#e59819" : "#303030"}
                  />
                  <FaStar
                    onClick={() => {
                      setStarCount(2);
                    }}
                    color={starCount >= 2 ? "#e59819" : "#303030"}
                  />
                  <FaStar
                    onClick={() => {
                      setStarCount(3);
                    }}
                    color={starCount >= 3 ? "#e59819" : "#303030"}
                  />
                  <FaStar
                    onClick={() => {
                      setStarCount(4);
                    }}
                    color={starCount >= 4 ? "#e59819" : "#303030"}
                  />
                  <FaStar
                    onClick={() => {
                      setStarCount(5);
                    }}
                    color={starCount >= 5 ? "#e59819" : "#303030"}
                  />
                </div>
                <div className="fw-bolder mt-3">Description</div>
                <div className="border border-dark mt-1 ">
                  <textarea
                    style={{
                      background: "none",
                      outline: "none",
                      border: "none",
                    }}
                    value={reviewDesc}
                    onChange={(e) => {
                      setReviewDesc(e.target.value);
                    }}
                    type="text"
                    placeholder="Your reviews about the course"
                    color="#303030"
                    className="text-left mt-1 ps-2 text-dark w-100"
                  />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  className="bg-dark mt-3 text-center w-100 text-light px-4 py-2 fw-bold"
                  onClick={reviewSubmitHandler}
                >
                  Submit
                </div>
              </div>
            ) : (
              ""
            )}
            {courseReviewList.length > 0 ? (
              courseReviewList.map((courseReview, id) => (
                <div key={id}>
                  <ReviewCard courseReview={courseReview} />
                </div>
              ))
            ) : (
              <div className="mt-3">
                {isUserEnrolled
                  ? "No reviews found"
                  : "No review found. Buy this course to review it."}
              </div>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default CourseDesc;

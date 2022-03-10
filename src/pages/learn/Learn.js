import React, { useEffect, useContext, useState } from "react";
import NormalCard from "../../component/NormalCard";
import { Link } from "react-router-dom";
import "firebase/firestore";
import "./learn.css";
import { getCourses } from "./helper/LearnHelper";
import { SET_COURSE } from "../../context/coursecontext/actions.types";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import Base from "../../layout/Base";

const Learn = () => {
  const { state, dispatch } = useContext(CourseContext);
  const { courses } = state;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading((prev) => !prev);
    getCourses().then((res) => {
      dispatch({
        type: SET_COURSE,
        payload: res,
      });
      setIsLoading((prev) => !prev);
    });
  }, []);
  return (
    <Base>
      <div className="container">
        <div className="d-lg-flex mt-5 justify-content-between align-items-center">
          <div>
            <h3 className="fs-3  fw-bolder">A broad selection of courses</h3>
            <p>
              Choose from hundreds of online video courses with new additions
              published every month
            </p>
          </div>

          <div className="mt-3 mt-lg-0">
            <Link to="/learn/courses">
              <div
                style={{ cursor: "pointer" }}
                className="d-inline  bg-light border border-dark mt-3 text-center  text-dark px-4 py-2 fw-bold"
              >
                View all
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-3">
          <div className="row">
            {!isLoading ? (
              courses.map((course, id) => {
                return (
                  <div
                    key={id}
                    className="col-sm col-lg-3 mt-2 d-flex justify-content-center"
                    style={{ height: "300px" }}
                  >
                    <NormalCard course={course}></NormalCard>
                  </div>
                );
              })
            ) : (
              <div className="d-flex mt-5 w-100 align-items-center justify-content-center">
                <div className="spinner-border" role="status"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Learn;

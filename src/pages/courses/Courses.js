import React, { useEffect, useContext, useRef } from "react";
import "firebase/firestore";
import ExpandedCard from "../../component/ExpandedCard";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import Base from "../../layout/Base";
import Filter from "./Filter";
import { SET_CURRENT_COURSE_VIEW } from "../../context/coursecontext/actions.types";
import { getCourses } from "./helper/courseHelper";

const Courses = () => {
  const filterRef = useRef(null);

  const { state, dispatch } = useContext(CourseContext);
  const { currentCourseList } = state;

  //   const getCourses = () => {
  //     if (userCourseList.length !== 0) {
  //       setCourseList(userCourseList);
  //       setUserEnrollments(true);
  //     } else {
  //       var list = [];
  //       db.collection("courses")
  //         .get()
  //         .then((snap) => {
  //           snap.forEach((doc) => {
  //             var addId = { ...doc.data(), id: doc.id };
  //             list.push(addId);
  //           });
  //           setCourseList(list);
  //         });
  //     }
  //   };

  useEffect(() => {
    getCourses().then((res) => {
      dispatch({
        type: SET_CURRENT_COURSE_VIEW,
        payload: res,
      });
    });
  }, []);

  const filterCloseHandler = (e) => {
    e.preventDefault();
    filterRef.current.style.transform = "translateX(0%)";
    filterRef.current.style.width = "50%";
  };

  return (
    <Base>
      <div className="container">
        <div
          onClick={filterCloseHandler}
          className="d-lg-none text-decoration-none mt-3 mt-md-0"
        >
          <span className="bg-dark text-light px-4 py-2 fw-bold ">Filter</span>
        </div>
        <div
          ref={filterRef}
          id="miniFilter"
          className="container d-flex flex-column bg-dark position-fixed left-0 top-0 start-0 text-light h-100 "
        >
          <div className="py-3 px-2 w-100 ">
            <Filter filterRef={filterRef} />
          </div>
        </div>

        <section className="mt-3 d-flex justify-content-start w-100">
          <div id="filter" className=" pe-5">
            <hr />
            <Filter filterRef={filterRef} />
          </div>

          {currentCourseList.length > 0 ? (
            <div className="m-1">
              {currentCourseList.map((course, id) => {
                return <ExpandedCard key={id} courses={course}></ExpandedCard>;
              })}
            </div>
          ) : (
            "Loading"
          )}
        </section>
      </div>
    </Base>
  );
};

export default Courses;

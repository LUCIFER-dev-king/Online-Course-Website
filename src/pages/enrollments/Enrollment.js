import React, { useState, useEffect, useContext } from "react";
import NormalCard from "../../component/NormalCard";
import Base from "../../layout/Base";
import {
  getEnrollments,
  getListOfUserCourses,
} from "../learn/helper/LearnHelper";

const Enrollment = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [userEnrollments, setUserEnrollments] = useState([]);

  useEffect(() => {
    if (user != null) {
      getEnrollments(user.uid).then((res) => {
        if (res != undefined) {
          res.forEach((doc) => {
            getListOfUserCourses(doc).then((result) => {
              setUserEnrollments((prev) => [...prev, result]);
            });
          });
        }
      });
    }
  }, []);
  return (
    <Base>
      <div className="container">
        <div className="mt-4 ">
          <h3 className="fs-3 mt-5 fw-bolder">My Enrollments</h3>
          {userEnrollments.length > 0 ? (
            <div id="card" className="d-md-flex">
              {userEnrollments.map((enrollments, id) => {
                return (
                  <div key={id} className="m-2" style={{ height: "350px" }}>
                    <NormalCard course={enrollments}></NormalCard>;
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-muted">
              Please enroll in some courses to continue
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Enrollment;

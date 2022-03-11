import React, { useState, useEffect } from "react";
import NormalCard from "../../component/NormalCard";
import Base from "../../layout/Base";
import {
  getEnrollments,
  getListOfUserCourses,
} from "./helper/enrollmentHelper";

const Enrollment = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [userEnrollments, setUserEnrollments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user != null) {
      setIsLoading((prev) => !prev);

      getEnrollments(user.uid).then((res) => {
        if (res !== undefined) {
          res.forEach((doc) => {
            getListOfUserCourses(doc).then((result) => {
              setUserEnrollments((prev) => [...prev, result]);
            });
          });
          setIsLoading((prev) => !prev);
        }
      });
    }
  }, []);
  return (
    <Base>
      <div className="container">
        <div className="mt-4 ">
          <h3 className="fs-3 mt-5 fw-bolder">My Enrollments</h3>
          {!isLoading ? (
            userEnrollments.length > 0 ? (
              <div className="mt-3 mb-5 row">
                {userEnrollments.map((enrollments, id) => {
                  return (
                    <div
                      key={id}
                      className="col-sm col-lg-3 mt-2"
                      style={{ height: "300px" }}
                    >
                      <NormalCard course={enrollments}></NormalCard>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-muted">
                Please enroll in some courses to continue
              </div>
            )
          ) : (
            <div className="d-flex mt-5 w-100 align-items-center justify-content-center">
              <div className="spinner-border" role="status"></div>
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Enrollment;

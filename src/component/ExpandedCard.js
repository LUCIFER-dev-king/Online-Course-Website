import React from "react";
import { useHistory } from "react-router-dom";
import { getSyllabus } from "../pages/courseDesc/helper/courseDescHelper";
import { levelFinder } from "../utils";
import ReviewStar from "./ReviewStar";

const ExpandedCard = ({ courses }) => {
  var price;
  let history = useHistory();
  const {
    courseName,
    coursePrice,
    level,
    rating,
    thumbnailUrl,
    courseDiscount,
    courseTagLine,
  } = courses;

  const sendToCourseDesc = () => {
    history.push({
      pathname: `/learn/${courseName}/`,
      state: {
        course: courses,
      },
    });
  };

  return (
    <div
      id="expanded-card"
      className="d-md-flex mb-2 justify-content-between"
      onClick={sendToCourseDesc}
      style={{ cursor: "pointer" }}
    >
      <div className="d-md-flex justify-content-start">
        <img
          style={{
            width: "250px",
            height: "150px",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          src={thumbnailUrl}
          alt={""}
          className="bg-dark rounded me-3"
        />
        <div id="expanded-content-card" className="d-flex flex-column ms-2">
          <h5 className="fw-bolder">{courseName}</h5>
          <p>{courseTagLine}</p>
          <p className="text-muted">Level: {levelFinder(level)}</p>
          <div className="d-flex align-items-center">
            <div style={{ color: "#e59819" }} className="fw-bolder mt-1">
              {rating}
            </div>
            <div className="ms-2">
              <ReviewStar starCount={rating} />
            </div>
          </div>
        </div>
      </div>
      <div className="ms-auto">
        <p className="px-2 fw-bolder">
          ₹
          {Math.floor(
            (price = coursePrice - (coursePrice * courseDiscount) / 100)
          )}
        </p>
      </div>
    </div>
  );
};

export default ExpandedCard;

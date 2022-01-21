import React from "react";
import { FaStar } from "react-icons/fa";
import ReviewStar from "../component/ReviewStar";
import { useHistory } from "react-router-dom";
import "./component.css";

const NormalCard = ({ course }) => {
  let history = useHistory();
  var price;
  const {
    courseName,
    coursePrice,
    authorName,
    thumbnailUrl,
    courseDiscount,
    rating,
  } = course;
  const sendToCourseDesc = () => {
    history.push({
      pathname: `/learn/${courseName}`,
      state: {
        course: course,
      },
    });
  };
  return (
    <div
      id="course-card"
      onClick={sendToCourseDesc}
      className="h-100 "
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <div className="normalCard ">
        <img
          className="card-img-top hover-zoom"
          src={thumbnailUrl}
          alt="courseImg"
        ></img>
      </div>

      <div className="card-body p-0 py-2">
        <h5 className="card-title fw-bolder m-0">{courseName}</h5>
        <p className="card-text text-muted">{authorName}</p>
        <div class="d-flex align-items-center">
          <div style={{ color: "#e59819" }} className="fw-bolder mt-1">
            {rating}
          </div>
          <div className="ms-2">
            <ReviewStar starCount={rating} />
          </div>
        </div>

        <div className="d-flex mt-1">
          <p className="px-1">
            <del>₹{coursePrice}</del>
          </p>
          <p className="px-2 fw-bolder">
            ₹
            {Math.floor(
              (price = coursePrice - (coursePrice * courseDiscount) / 100)
            )}
          </p>
          <p>{courseDiscount}% off</p>
        </div>
      </div>
    </div>
  );
};

export default NormalCard;

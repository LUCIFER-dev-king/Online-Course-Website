import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewStar = ({ starCount }) => {
  return (
    <p>
      <FaStar color={starCount >= 1 ? "#e59819" : "#303030"} />
      <FaStar color={starCount >= 2 ? "#e59819" : "#303030"} />
      <FaStar color={starCount >= 3 ? "#e59819" : "#303030"} />
      <FaStar color={starCount >= 4 ? "#e59819" : "#303030"} />
      <FaStar color={starCount >= 5 ? "#e59819" : "#303030"} />
    </p>
  );
};

export default ReviewStar;

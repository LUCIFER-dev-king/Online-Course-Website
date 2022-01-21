import React from "react";
import ReviewStar from "./ReviewStar";

const ReviewCard = ({ courseReview }) => {
  const { name, star, review } = courseReview;
  let imageName = name[0] + name[name.length - 1];
  return (
    <div className="d-flex mt-4 justify-content-start">
      <div
        className="text-light text-center "
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          backgroundColor: "#303030",
        }}
      >
        <div
          color={"#fff"}
          className="fs-5 text-uppercase fw-bolder mt-2 h-100 my-auto"
        >
          {imageName}
        </div>
      </div>

      <div className="ms-3">
        <p className="fw-bolder fs-5">{name}</p>
        <ReviewStar starCount={star} />

        <p>{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;

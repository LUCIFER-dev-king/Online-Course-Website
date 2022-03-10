import React from "react";

const OrderCard = ({ course }) => {
  return (
    <div className="d-md-flex justify-content-start">
      <img
        style={{
          width: "250px",
          height: "150px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        src={course.thumbnailUrl}
        alt={""}
        className="bg-dark rounded me-3"
      />
      <div className="d-flex flex-column ms-2">
        <h5>{course.courseName}</h5>
        <p>{course.courseTagLine}</p>
      </div>
    </div>
  );
};

export default OrderCard;

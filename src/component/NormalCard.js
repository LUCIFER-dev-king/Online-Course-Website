import React from "react";
import { useHistory } from "react-router-dom";
import "./component.css";

const NormalCard = ({ course }) => {
  let history = useHistory();
  var price;
  const { courseName, coursePrice, courseDesc, thumbnailUrl, courseDiscount } =
    course;
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
      onClick={sendToCourseDesc}
      className='card m-2'
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <div className='normalCard'>
        <img
          className='card-img-top hover-zoom'
          src={thumbnailUrl}
          alt='courseImg'
        ></img>
      </div>

      <div className='card-body'>
        <h5 className='card-title'>{courseName}</h5>
        <p className='card-text'>{courseDesc}</p>
        <div className='d-flex '>
          <p className='px-1'>
            <del>{coursePrice}</del>
          </p>
          <p className='px-2'>
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

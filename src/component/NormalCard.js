import React from "react";
import { useHistory } from "react-router-dom";
import "./component.css";

const NormalCard = ({ course }) => {
  let history = useHistory();
  const { courseName, coursePrice, courseDesc } = course;
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
          src='https://source.unsplash.com/random'
          alt='courseImg'
        ></img>
      </div>

      <div className='card-body'>
        <h5 className='card-title'>{courseName}</h5>
        <p className='card-text'>{courseDesc}</p>
        <p>{coursePrice}</p>
      </div>
    </div>
  );
};

export default NormalCard;

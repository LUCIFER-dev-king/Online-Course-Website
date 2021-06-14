import React from "react";
import { useHistory } from "react-router-dom";

const ExpandedCard = ({ courses }) => {
  let history = useHistory();
  const { courseName, coursePrice, courseDesc, thumbnailUrl, courseTagLine } =
    courses;

  const sendToCourseDesc = () => {
    history.push({
      pathname: `/learn/${courseName}`,
      state: {
        course: courses,
      },
    });
  };

  return (
    <div className='courseListItem p-2 border-top'>
      <div
        className='row py-2'
        onClick={sendToCourseDesc}
        style={{ cursor: "pointer" }}
      >
        <div
          className='col-2'
          style={{
            background: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            margin: "0rem 1rem",
          }}
        ></div>

        <div className='col-6'>
          <div className='courseItemCount'>
            <h5>{courseName}</h5>
            <p>{courseTagLine}</p>
            <p>{courseDesc}</p>
          </div>
        </div>
        <div className='col-3' style={{ textAlign: "right" }}>
          <h6 className=''>{coursePrice}</h6>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;

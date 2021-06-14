import React from "react";
import { useHistory } from "react-router-dom";
import { getSyllabus } from "../pages/learn/helper/LearnHelper";

const ExpandedCard = ({ courses, userCourses }) => {
  let history = useHistory();
  const {
    courseName,
    coursePrice,
    courseDesc,
    thumbnailUrl,
    courseTagLine,
    id,
  } = courses;

  const sendToCourseDesc = (id) => {
    if (userCourses) {
      getSyllabus(id).then((result) => {
        history.push({
          pathname: `/learn/${courseName}/syllabus`,
          state: {
            course: courses,
            syllabus: result,
          },
        });
      });
    } else {
      history.push({
        pathname: `/learn/${courseName}/`,
        state: {
          course: courses,
        },
      });
    }
  };

  return (
    <div className='courseListItem p-2 border-top'>
      <div
        className='row py-2'
        onClick={() => {
          sendToCourseDesc(id);
        }}
        style={{ cursor: "pointer" }}
      >
        <div
          className='col-sm-2 img-fluid'
          style={{
            background: `url(${thumbnailUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className='col-sm-7'>
          <div className='courseItemCount'>
            <h5>{courseName}</h5>
            <p>{courseTagLine}</p>
            <p>{courseDesc}</p>
          </div>
        </div>
        {!userCourses && (
          <div className='col-sm-3' style={{ textAlign: "right" }}>
            <h6 className=''>{coursePrice}</h6>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpandedCard;

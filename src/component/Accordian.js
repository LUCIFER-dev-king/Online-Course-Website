import React, { useContext } from "react";
import { CourseContext } from "../context/coursecontext/CouseContext";
import { SET_VIDEOURL } from "../context/coursecontext/actions.types";

const Accordian = ({ syllabus }) => {
  const { dispatch } = useContext(CourseContext);
  const setPlayerUrl = (url) => {
    dispatch({
      type: SET_VIDEOURL,
      payload: url,
    });
  };
  return (
    <div className='accordion ' id='accordionExample'>
      <div class='accordion-item'>
        <h2 class='accordion-header' id='headingOne'>
          <button
            class='accordion-button'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapseOne'
            aria-expanded='true'
            aria-controls='#collapseOne'
          >
            {syllabus.sectionName}
          </button>
        </h2>
        <div
          id='collapseOne'
          class='accordion-collapse'
          aria-labelledby='headingOne'
          data-bs-parent='accordionExample'
          onClick={() => {
            setPlayerUrl(syllabus.videoUrl);
          }}
          style={{ cursor: "pointer" }}
        >
          <div class='accordion-body'>{syllabus.videoName}</div>
        </div>
      </div>
    </div>
  );
};

export default Accordian;

import React, { useState, useContext } from "react";
import { FaArrowLeft, FaUser, FaPlay } from "react-icons/fa";
import "./videoplayer.css";
import ReactPlayer from "react-player/lazy";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CourseInfo from "../../component/CourseInfo";
import Accordian from "../../component/Accordian";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { SET_VIDEOURL } from "../../context/coursecontext/actions.types";

const VideoPalyer = () => {
  const { state, dispatch } = useContext(CourseContext);
  const { videoUrl } = state;
  const location = useLocation();
  const { courseName, courseDesc, coursePrice, id } = location.state.course;
  const history = useHistory();

  const playFirstVideo = () => {
    dispatch({
      type: SET_VIDEOURL,
      payload: location.state.syllabus[0].videoUrl,
    });
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div id='courseVideo' style={{ overflow: "hidden" }}>
      <div className='row'>
        <section className='col-md-8' style={{ overflow: "scroll" }}>
          <div className='row'>
            <div className='col-1'>
              <FaArrowLeft className='back-icon' onClick={goBack} />
            </div>
            <div className='col-6 mt-2 d-flex align-items-center'>
              <h4>{courseName}</h4>
            </div>
          </div>
          <section id='videoSection'>
            {videoUrl === "" ? (
              <div className='video-player'>
                <div className='video-player-button'>
                  <FaPlay onClick={playFirstVideo} />
                </div>
              </div>
            ) : (
              <ReactPlayer
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e) => e.preventDefault()}
                width='100%'
                height='500px'
                controls
                url={videoUrl}
              />
            )}
          </section>
          <div className='p-3'>
            <CourseInfo
              course={location.state.course}
              syllabus={location.state.syllabus}
              fromVideoPlayer={false}
            />
          </div>
        </section>
        <section className='col-md-4'>
          <h2>Syllabus</h2>
          {location.state.syllabus.map((syllabus, id) => (
            <Accordian key={id} syllabus={syllabus}></Accordian>
          ))}
        </section>
      </div>
    </div>
  );
};

export default VideoPalyer;

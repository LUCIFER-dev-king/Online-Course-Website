import React, { useContext, useState } from "react";
import { FaArrowLeft, FaPlay } from "react-icons/fa";
import "./videoplayer.css";
import ReactPlayer from "react-player/lazy";
import { useHistory } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AccordianCard from "../../component/AccordianCard";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { SET_VIDEOURL } from "../../context/coursecontext/actions.types";

const VideoPalyer = () => {
  const { state, dispatch } = useContext(CourseContext);
  const { videoUrl } = state;
  const location = useLocation();
  const { courseName } = location.state.course;
  const [currentVideoName, setCurrentVideoName] = useState("");
  const history = useHistory();

  const playFirstVideo = () => {
    dispatch({
      type: SET_VIDEOURL,
      payload: location.state.syllabus[0].videoList[0].videoUrl,
    });
    setCurrentVideoName(location.state.syllabus[0].videoList[0].videoName);
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="w-100 overflow-hidden">
      <div className="d-lg-flex justify-content-between">
        <div id="video-section">
          <div className="d-flex mb-1 w-100 justify-content-start align-items-center">
            <FaArrowLeft
              className="back-icon"
              onClick={goBack}
              style={{ cursor: "pointer" }}
            />
            <div>
              <h4 className="m-0 ms-2 fw-bolder">{courseName}</h4>
            </div>
          </div>
          <section id="video">
            {videoUrl === "" ? (
              <div className="video-player">
                <div className="video-player-button">
                  <FaPlay onClick={playFirstVideo} />
                </div>
              </div>
            ) : (
              <ReactPlayer
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                onContextMenu={(e) => e.preventDefault()}
                width="100%"
                height="500px"
                controls
                url={videoUrl}
              />
            )}
          </section>
          <div className="px-2 py-3">
            <h5>{currentVideoName}</h5>
          </div>
        </div>
        <div
          id="syllabus-section"
          className="p-1 pb-5 pb-lg-0 border overflow-auto"
        >
          <div className="align-center fw-bolder fs-4">Course Content</div>
          {location.state.syllabus.length > 0
            ? location.state.syllabus.map((syllabus, id) => (
                <Accordion key={id} defaultActiveKey="0">
                  <AccordianCard
                    syllabus={syllabus}
                    setCurrentVideoName={setCurrentVideoName}
                    isCallFromCourseDesc={false}
                  ></AccordianCard>
                </Accordion>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default VideoPalyer;

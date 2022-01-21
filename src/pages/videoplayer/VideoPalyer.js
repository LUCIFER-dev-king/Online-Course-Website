import React, { useContext } from "react";
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
              <h4 className="m-0 ms-2">{courseName}</h4>
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
          <div style={{ padding: "2rem" }}>
            <h5>Current Video Name</h5>
          </div>
        </div>
        <div id="syllabus-section" className="p-1 overflow-auto">
          <div className="align-center fw-bolder fs-4">Course Content</div>

          {location.state.syllabus.length > 0
            ? location.state.syllabus.map((syllabus, id) => (
                <Accordion key={id} defaultActiveKey="0">
                  <AccordianCard syllabus={syllabus}></AccordianCard>
                </Accordion>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default VideoPalyer;

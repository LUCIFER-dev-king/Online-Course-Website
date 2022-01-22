import React, { useContext } from "react";
import { CourseContext } from "../context/coursecontext/CouseContext";
import { SET_VIDEOURL } from "../context/coursecontext/actions.types";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";

const AccordianCard = ({ syllabus, setCurrentVideoName }) => {
  const { dispatch } = useContext(CourseContext);

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <Card className="mt-2 px-2 py-2 py-md-3 " onClick={decoratedOnClick}>
        {children}
      </Card>
    );
  };

  const handleVideoPlayerUrl = (video) => {
    setCurrentVideoName(video.videoName);
    dispatch({
      type: SET_VIDEOURL,
      payload: video.videoUrl,
    });
  };

  return (
    <div>
      <div style={{ cursor: "pointer" }}>
        <CustomToggle eventKey={syllabus.sectionId}>
          {syllabus.sectionName}
        </CustomToggle>
      </div>
      {syllabus.videoList.map((video, id) => (
        <div key={id}>
          <Accordion.Collapse
            eventKey={syllabus.sectionId}
            className="text-dark rounded"
          >
            <Card.Body
              onClick={() => handleVideoPlayerUrl(video)}
              id="accordian-body"
              className=" rounded"
            >
              {video.videoName}
            </Card.Body>
          </Accordion.Collapse>
        </div>
      ))}
    </div>
  );
};

export default AccordianCard;

import React, { useContext } from "react";
import { CourseContext } from "../context/coursecontext/CouseContext";
import { SET_VIDEOURL } from "../context/coursecontext/actions.types";
import { Accordion, Card, useAccordionButton } from "react-bootstrap";

const AccordianCard = ({ syllabus }) => {
  const { dispatch } = useContext(CourseContext);
  const setPlayerUrl = (url) => {
    dispatch({
      type: SET_VIDEOURL,
      payload: url,
    });
  };
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => console.log("totally custom!")
      //TODO: SET Player URL here.
    );

    return (
      <Card className="mt-2 px-2 py-2 py-md-3 " onClick={decoratedOnClick}>
        {children}
      </Card>
    );
  }
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
            <Card.Body id="accordian-body" className=" rounded">
              {video.videoName}
            </Card.Body>
          </Accordion.Collapse>
        </div>
      ))}
    </div>
  );
};

export default AccordianCard;

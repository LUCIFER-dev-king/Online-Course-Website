import React, { useState, useContext } from "react";
import { FaCross, FaAngleUp } from "react-icons/fa";
import { SET_CURRENT_COURSE_VIEW } from "../../context/coursecontext/actions.types";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { getFilterCourses } from "./helper/courseHelper";

const Filter = ({ filterRef }) => {
  const { dispatch } = useContext(CourseContext);

  const inputArrayList = ["newbie", "intermediate", "advanced"];
  const [inputArrayCheckedList, setInputArrayCheckedList] = useState(
    new Array(inputArrayList.length).fill(false)
  );
  const [levelState, setLevelState] = useState(0);
  const levelSettings = {
    newbie: 1,
    intermediate: 2,
    advanced: 3,
  };

  const filterCloseHandler = (e) => {
    e.preventDefault();
    filterRef.current.style.transform = "translateX(-100%)";
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLevelState(levelState <= 0 ? 4 : levelState);
    dispatch({
      type: SET_CURRENT_COURSE_VIEW,
      payload: [],
    });
    getFilterCourses(levelState).then((res) => {
      dispatch({
        type: SET_CURRENT_COURSE_VIEW,
        payload: res,
      });
    });
  };

  const handleInputArrayListChange = (position, e) => {
    const updatedArrayList = inputArrayCheckedList.map((item, index) =>
      index === position ? !item : item
    );
    setInputArrayCheckedList(updatedArrayList);

    if (
      inputArrayList[position] === "newbie" ||
      inputArrayList[position] === "intermediate" ||
      inputArrayList[position] === "advanced"
    ) {
      if (updatedArrayList[position]) {
        if (levelState < levelSettings[inputArrayList[position]]) {
          setLevelState(levelSettings[inputArrayList[position]]);
        }
      } else {
        //This reduces the level if user unclick.
        //Downside the level becomes zero after unclik newbie.
        //If newbie click and advance is unlick if falls to intermediate but not newbit.
        setLevelState(levelSettings[inputArrayList[position]] - 1);
      }
    }
  };
  return (
    <div>
      <div className=" d-flex d-lg-none justify-content-end">
        <FaCross onClick={filterCloseHandler} />
      </div>
      <div className="d-flex flex-column">
        <h5>Level</h5>

        <form onSubmit={handleOnSubmit}>
          {inputArrayList.map((name, id) => (
            <div
              key={id}
              className="mt-3 d-flex justify-content-start align-items-center"
            >
              <input
                style={{ width: "15px", height: "15px" }}
                type="checkbox"
                name={name}
                checked={inputArrayCheckedList[id]}
                onChange={() => {
                  handleInputArrayListChange(id);
                }}
              />
              <label
                style={{ textTransform: "capitalize" }}
                className="mx-2"
                for={name}
              >
                {name}
              </label>
            </div>
          ))}

          <hr />
          <div className="mt-3">
            <button
              id="filterSearchBtn"
              type="submit"
              style={{ cursor: "pointer" }}
              className="rounded mt-3 text-center w-100 px-4 py-2 fw-bold"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;

import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { SET_CURRENT_COURSE_VIEW } from "../../context/coursecontext/actions.types";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { getFilterCourses } from "./helper/courseHelper";
import ReviewStar from "../../component/ReviewStar";

const Filter = ({ filterRef }) => {
  const { dispatch } = useContext(CourseContext);
  const [previousFilteredLevel, setPreviousFilteredLevel] = useState(0);
  const [previousReviewLevel, setPreviousReviewLevel] = useState(0);
  const inputArrayList = [
    "newbie",
    "intermediate",
    "advanced",
    "oneStar",
    "twoStar",
    "threeStar",
    "fourStar",
    "fiveStar",
  ];
  const [inputArrayCheckedList, setInputArrayCheckedList] = useState(
    new Array(inputArrayList.length).fill(false)
  );
  const [levelState, setLevelState] = useState(0);
  const levelSettings = {
    newbie: 1,
    intermediate: 2,
    advanced: 3,
  };
  const [reviewState, setReviewState] = useState(0);
  const reviewSettings = {
    oneStar: 1,
    twoStar: 2,
    threeStar: 3,
    fourStar: 4,
    fiveStar: 5,
  };

  const filterCloseHandler = (e) => {
    e.preventDefault();
    filterRef.current.style.transform = "translateX(-100%)";
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLevelState(levelState <= 0 ? 4 : levelState);
    setReviewState(reviewState <= 0 ? 4 : reviewState);
    dispatch({
      type: SET_CURRENT_COURSE_VIEW,
      payload: [],
    });
    getFilterCourses(levelState, reviewState).then((res) => {
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
        if (previousFilteredLevel) {
          setPreviousFilteredLevel(levelState);
        } else {
          setPreviousFilteredLevel(1);
        }
        if (levelState < levelSettings[inputArrayList[position]]) {
          setLevelState(levelSettings[inputArrayList[position]]);
        }
      } else {
        setLevelState(previousFilteredLevel);
      }
    } else {
      if (updatedArrayList[position]) {
        if (previousReviewLevel) {
          setPreviousReviewLevel(levelState);
        } else {
          setPreviousReviewLevel(1);
        }
        if (reviewState < reviewSettings[inputArrayList[position]]) {
          setReviewState(reviewSettings[inputArrayList[position]]);
        }
      } else {
        setReviewState(previousReviewLevel);
      }
    }
  };
  return (
    <div>
      <div className=" d-flex d-lg-none justify-content-end">
        <MdClose className="fs-4" onClick={filterCloseHandler} />
      </div>
      <div className="d-flex flex-column">
        <h5>Level</h5>

        <form onSubmit={handleOnSubmit}>
          {inputArrayList.map((name, id) => (
            <div key={id}>
              {id === 3 ? (
                <div>
                  <hr />
                  <h5>Reviews</h5>
                </div>
              ) : (
                ""
              )}
              <div className="mt-2 d-flex justify-content-start align-items-center">
                <input
                  className={id < 3 ? "" : "mt-1"}
                  style={{ width: "15px", height: "15px" }}
                  type="checkbox"
                  name={name}
                  checked={inputArrayCheckedList[id]}
                  onChange={() => {
                    handleInputArrayListChange(id);
                  }}
                />
                {id < 3 ? (
                  <label
                    style={{ textTransform: "capitalize" }}
                    className="mx-2"
                    htmlFor={name}
                  >
                    {name}
                  </label>
                ) : (
                  <label className="mx-2" htmlFor={name}>
                    <ReviewStar starCount={id - 2} />
                  </label>
                )}
              </div>
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

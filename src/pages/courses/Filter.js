import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import {
  SET_CURRENT_COURSE_VIEW,
  SET_LOADING,
} from "../../context/coursecontext/actions.types";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { getFilterCourses } from "./helper/courseHelper";
import ReviewStar from "../../component/ReviewStar";

const Filter = ({ filterRef }) => {
  const { dispatch } = useContext(CourseContext);
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
  const levelSettings = {
    newbie: 1,
    intermediate: 2,
    advanced: 3,
  };
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

  const handleOnSubmit = (level, review) => {
    dispatch({
      type: SET_CURRENT_COURSE_VIEW,
      payload: [],
    });
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    getFilterCourses(level, review).then((res) => {
      dispatch({
        type: SET_CURRENT_COURSE_VIEW,
        payload: res,
      });
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
  };

  const [levelArray, setLevelArray] = useState([]);
  const [reviewArray, setReviewArray] = useState([]);

  const handleInputArrayListChange = (position, e) => {
    var levelArr = levelArray;
    var reviewArr = reviewArray;

    //Checking whether it is previously clicked.
    const updatedArrayList = inputArrayCheckedList.map((item, index) =>
      index === position ? !item : item
    );
    setInputArrayCheckedList(updatedArrayList);

    if (
      inputArrayList[position] === "newbie" ||
      inputArrayList[position] === "intermediate" ||
      inputArrayList[position] === "advanced"
    ) {
      //If it clicked first time
      if (updatedArrayList[position]) {
        levelArr.push(levelSettings[inputArrayList[position]]);
        setLevelArray(levelArr);
        handleOnSubmit(levelArr, reviewArray);
      }
      //If it was already clicked time
      else {
        levelArr = levelArr.filter(
          (levels) => levels !== levelSettings[inputArrayList[position]]
        );
        setLevelArray(levelArr);
        handleOnSubmit(levelArr, reviewArray);
      }
    } else {
      if (updatedArrayList[position]) {
        reviewArr.push(reviewSettings[inputArrayList[position]]);
        setReviewArray(reviewArr);
        handleOnSubmit(levelArray, reviewArr);
      } else {
        reviewArr = reviewArr.filter(
          (reviews) => reviews !== reviewSettings[inputArrayList[position]]
        );
        setReviewArray(reviewArr);
        handleOnSubmit(levelArray, reviewArr);
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

        <form>
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
        </form>
      </div>
    </div>
  );
};

export default Filter;

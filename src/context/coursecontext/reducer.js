import {
  SET_LOADING,
  SET_COURSE,
  SET_VIDEOURL,
  SET_USER_COURSE_LIST,
  SET_CURRENT_COURSE_VIEW,
} from "./actions.types";

const Reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case SET_COURSE:
      return action.payload === null
        ? { ...state, courses: [] }
        : { ...state, courses: action.payload };
    case SET_VIDEOURL:
      return action.payload === null
        ? { ...state, videoUrl: "" }
        : { ...state, videoUrl: action.payload };

    case SET_USER_COURSE_LIST:
      return action.payload === null
        ? { ...state, userCourseList: [] }
        : { ...state, userCourseList: action.payload };

    case SET_CURRENT_COURSE_VIEW:
      return action.payload === null
        ? { ...state, currentCourseList: [] }
        : { ...state, currentCourseList: action.payload };
    default:
      return state;
  }
};

export default Reducer;

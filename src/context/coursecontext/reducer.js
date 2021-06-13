import { SET_LOADING, SET_COURSE, SET_VIDEOURL } from "./actions.types";

export default (state, action) => {
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
    default:
      return state;
  }
};

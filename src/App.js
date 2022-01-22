import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPanel from "./pages/adminepanel/AdminPanel";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Landing Page/Home";
import CourseDesc from "./pages/courseDesc/CourseDesc";
import Learn from "./pages/learn/Learn";
import VideoPalyer from "./pages/videoplayer/VideoPalyer";
import { UserContext } from "./context/Context";
import { CourseContext } from "./context/coursecontext/CouseContext";
import reducer from "./context/coursecontext/reducer";
import Order from "./pages/order/Order";
import Courses from "./pages/courses/Courses";
import Cart from "./pages/cart/Cart";
import Enrollment from "./pages/enrollments/Enrollment";

function App() {
  const [user, setUser] = useState(null);
  const initialState = {
    isLoading: false,
    courses: [],
    videoUrl: "",
    userCourseList: [],
    currentCourseList: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  //-Remove unnecesary code and refractre context api.
  //--Add start in Filter section and chagne ui.

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <CourseContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/learn" component={Learn} />
              <Route exact path="/mycart" component={Cart} />
              <Route exact path="/enrollments" component={Enrollment} />
              <Route exact path="/learn/courses" component={Courses} />
              <Route exact path="/learn/:courseName" component={CourseDesc} />
              <Route exact path="/learn/:courseName/order" component={Order} />
              <Route
                exact
                path="/learn/:courseName/syllabus"
                component={VideoPalyer}
              />
              <Route exact path="/admin" component={AdminPanel} />
            </Switch>
          </CourseContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

import React, { useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AdminPanel from "./pages/adminepanel/AdminPanel";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Home";
import CourseDesc from "./pages/learn/CourseDesc";
import Learn from "./pages/learn/Learn";
import ViewAll from "./pages/learn/ViewAll";
import VideoPalyer from "./pages/videoplayer/VideoPalyer";

import firebase from "firebase/app";
import firebaseConfig from "./config/firebaseconfig";
import { UserContext } from "./context/Context";
import { CourseContext } from "./context/coursecontext/CouseContext";
import reducer from "./context/coursecontext/reducer";
// firebase.initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  const initialState = {
    isLoading: false,
    courses: [],
    videoUrl: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className='App'>
      <Router>
        <UserContext.Provider value={{ user, setUser }}>
          <CourseContext.Provider value={{ state, dispatch }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/learn' component={Learn} />
              <Route exact path='/learn/viewall' component={ViewAll} />
              <Route exact path='/learn/:courseName' component={CourseDesc} />
              <Route
                exact
                path='/learn/:courseName/syllabus'
                component={VideoPalyer}
              />
              <Route exact path='/admin' component={AdminPanel} />
            </Switch>
          </CourseContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;

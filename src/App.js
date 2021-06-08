import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";
import Home from "./pages/Home";
import CourseDesc from "./pages/learn/CourseDesc";
import Learn from "./pages/learn/Learn";
import ViewAll from "./pages/learn/ViewAll";

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/learn' component={Learn} />
          <Route exact path='/learn/viewall' component={ViewAll} />
          <Route exact path='/coursedesc' component={CourseDesc} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

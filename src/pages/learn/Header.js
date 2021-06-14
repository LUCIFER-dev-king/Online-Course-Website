import "./learn.css";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { getEnrollments } from "./helper/LearnHelper";
import { SET_USER_COURSE_LIST } from "../../context/coursecontext/actions.types";
const Header = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const { state, dispatch } = useContext(CourseContext);
  const history = useHistory();

  const logout = () => {
    localStorage.setItem("user", "");
  };

  const getUserEnrollments = () => {
    getEnrollments(user).then((res) => {
      if (res) {
        console.log(res);

        dispatch({
          type: SET_USER_COURSE_LIST,
          payload: res,
        });

        setTimeout(() => {
          history.push({
            pathname: "/learn/viewall",
            state: {
              courseList: res,
            },
          });
        }, 1500);
      }
    });
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light border-bottom'>
      <div
        className='container fluid'
        style={{ maxWidth: "1100px", padding: "0" }}
      >
        <a href='/learn' className='navbar-brand'>
          <h2>E-Learn</h2>
        </a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbar-2'
          area-controls='navbar-2'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse justify-content-end'
          id='navbar-2'
        >
          {user ? (
            <ul className='navbar-nav '>
              <li className='nav-item px-2'>
                <a
                  onClick={getUserEnrollments}
                  className='text-dark'
                  style={{ cursor: "pointer" }}
                >
                  My Enrollments
                </a>
              </li>
              <li className='nav-item px-2'>
                <a href='/learn' onClick={logout} className='text-dark'>
                  Log out
                </a>
              </li>
            </ul>
          ) : (
            <ul className='navbar-nav '>
              <li className='nav-item px-2'>
                <button type='button' className='btn btn-outline-primary'>
                  <Link to='/signup' className='text-primary'>
                    SignUp
                  </Link>
                </button>
              </li>
              <li className='nav-item '>
                <button type='button' className='btn btn-primary'>
                  <Link to='/signin'>SignIn</Link>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

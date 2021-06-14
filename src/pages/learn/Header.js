import "./learn.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
const Header = () => {
  var user = localStorage.getItem("user");

  const logout = () => {
    localStorage.setItem("user", "");
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
                <a href='/learn/viewall' className='text-dark'>
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

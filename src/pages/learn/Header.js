import "./learn.css";
import React from "react";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light'>
      <div
        className='container fluid'
        style={{ maxWidth: "1100px", padding: "0" }}
      >
        <a href='' className='navbar-brand'>
          <h2>E-Learn</h2>
        </a>
        <div className='collapse navbar-collapse justify-content-end'>
          <ul className='navbar-nav '>
            <li className='nav-item '>
              <button type='button' className='btn btn-outline-primary'>
                SignUp
              </button>
            </li>
            <li className='nav-item '>
              <button type='button' className='btn btn-outline-primary'>
                SignIn
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

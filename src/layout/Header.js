import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <div className='container fluid'>
        <a href='' className='navbar-brand'>
          <h2>E-Learn</h2>
        </a>
        <div className='collapse navbar-collapse justify-content-end'>
          <ul className='navbar-nav '>
            <li className='nav-item'>
              <a className='nav-link' href=''>
                <h5 className='mr-3'>Home</h5>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href=''>
                <h5>About us</h5>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href=''>
                <h5>Courses</h5>
              </a>
            </li>
            <li className='nav-item '>
              <button type='button' className='btn btn-outline-primary'>
                <Link to='/signin'>Log In/Register</Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./layout.css";

const LandingHeader = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-dark">
      <div className="container fluid">
        <a href="#heroSection" className="navbar-brand">
          <h2>E-Learn</h2>
        </a>
        <button
          className="navbar-toggler text-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-1"
          area-controls="navbar-1"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="text-light">
            <FaBars />
          </span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbar-1"
        >
          <ul className="navbar-nav">
            <li className="nav-item my-auto">
              <a className="nav-link" href="#heroSection">
                <h5 className="mr-3">Home</h5>
              </a>
            </li>
            <li className="nav-item my-auto">
              <a className="nav-link" href="#aboutUs">
                <h5>About us</h5>
              </a>
            </li>

            <li className="nav-item ">
              <button type="button" className="btn btn-primary ">
                {user ? (
                  <Link to="/learn" className="text-light">
                    Let's Go
                  </Link>
                ) : (
                  <Link to="/signin" className="text-light">
                    Login/Register
                  </Link>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingHeader;

import React from "react";
import { useHistory } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { FaBookOpen, FaShoppingCart } from "react-icons/fa";
import { ShortButton } from "../utils/utils";
import { auth } from "../config/firebaseconfig";

const Header = () => {
  var user = JSON.parse(localStorage.getItem("user"));

  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    auth.signOut();
    history.push("/signin");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand fs-4 fw-bold" href="/learn">
          E LEARN
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <MdMenu />
        </button>
        <div
          className="collapse navbar-collapse justify-content-center "
          id="navbarNavDropdown"
        >
          <div className="mt-3 ms-auto mt-lg-0">
            {user === null ? (
              <div>
                <a className="nav-item p-0 text-decoration-none" href="/signin">
                  <div>
                    <ShortButton buttonName={"SIGN IN"} />
                  </div>
                </a>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <div
                  style={{ cursor: "pointer" }}
                  className="me-3"
                  onClick={() => {
                    history.push("/enrollments");
                  }}
                >
                  <FaBookOpen className="fs-5" />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  className="me-2"
                  onClick={() => {
                    history.push("/mycart");
                  }}
                >
                  <FaShoppingCart className="fs-5" />
                </div>
                <div className="nav-item p-0 text-decoration-none">
                  <div onClick={logout}>
                    <ShortButton buttonName={"LOG OUT"} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CourseContext } from "../context/coursecontext/CouseContext";
import { getEnrollments } from "../pages/enrollments/helper/enrollmentHelper";
import { SET_USER_COURSE_LIST } from "../context/coursecontext/actions.types";
import { MdMenu } from "react-icons/md";
import { FaBookOpen, FaSearch, FaShoppingCart } from "react-icons/fa";
import { checkObjIsEmptyOrNot, ShortButton } from "../utils";
import { auth } from "../config/firebaseconfig";

const Header = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const { state, dispatch } = useContext(CourseContext);
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("user");
    auth.signOut();
    history.push("/signin");
  };

  const getUserEnrollments = () => {
    getEnrollments(user.uid).then((res) => {
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

  const searchHandler = async (e) => {
    e.preventDefault();
    if (searchText !== "") {
      // searchQuery(searchText).then((res) => {
      //   setSearchResult(res);
      // });
    }
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
          <div
            id="searchContainer"
            className="bg-light border border-dark w-50 p-2 ms-auto rounded"
          >
            <div className="d-flex ">
              <input
                style={{
                  background: "none",
                  outline: "none",
                  border: "none",
                }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                placeholder="Search"
                color="#fff"
                className="text-left ps-2 w-100 "
              />
              <div style={{ cursor: "pointer" }} className="h-100 my-auto pe-2">
                <FaSearch onClick={searchHandler} />
              </div>
            </div>
          </div>
          <div className="mt-3 ms-auto mt-lg-0">
            {user === null ? (
              <div>
                <a
                  className="nav-item p-0 p-lg-2 text-decoration-none"
                  href="/signin"
                >
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
                    {
                      history.push("/enrollments");
                    }
                  }}
                >
                  <FaBookOpen className="fs-5" />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  className="me-2"
                  onClick={() => {
                    {
                      history.push("/mycart");
                    }
                  }}
                >
                  <FaShoppingCart className="fs-5" />
                </div>
                <a className="nav-item p-0 p-lg-2 text-decoration-none">
                  <div onClick={logout}>
                    <ShortButton buttonName={"LOG OUT"} />
                  </div>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

import React, { useState, useEffect, useContext } from "react";
import NormalCard from "../../component/NormalCard";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import firebase from "firebase/app";
import "firebase/firestore";
import "./learn.css";
import { getCourses } from "./helper/LearnHelper";
import {
  SET_COURSE,
  SET_LOADING,
} from "../../context/coursecontext/actions.types";
import { CourseContext } from "../../context/coursecontext/CouseContext";
import { UserContext } from "../../context/Context";

const Learn = () => {
  const context = useContext(UserContext);
  const { state, dispatch } = useContext(CourseContext);
  const { courses } = state;

  useEffect(() => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    getCourses(true).then((res) => {
      dispatch({
        type: SET_COURSE,
        payload: res,
      });
    });

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }, []);

  return (
    <div>
      <Header />

      <div
        className='bg-dark text-white d-flex align-items-center'
        style={{ height: "150px" }}
      >
        <div className='learnContainer'>
          {context.user === null ? (
            <h2>Welcome to E-Learing Online</h2>
          ) : (
            <h2>Welcome to {context.user?.name}</h2>
          )}
        </div>
      </div>

      <div className='learnContainer mt-3'>
        <section id='courses'>
          <div className='d-flex justify-content-between'>
            <h3>Courses</h3>
            <Link to='/learn/viewall'>View all</Link>
          </div>
          <div id='card' className='d-flex'>
            {courses.map((course, id) => {
              return <NormalCard key={id} course={course}></NormalCard>;
            })}
          </div>
        </section>

        <section id='bundles'>
          <div className='d-flex justify-content-between'>
            <h3>Bundles</h3>
          </div>
          <div id='card' className='d-flex'>
            <div className='card m-2' style={{ width: "18rem" }}>
              <img
                className='card-img-top img-fluid'
                src='https://source.unsplash.com/random'
                alt='courseImg'
              ></img>
              <div className='card-body'>
                <h5 className='card-title'>Lorem ipsum dolor sit amet.</h5>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ab?
                </p>
                <p>150</p>
              </div>
            </div>
            <div className='card m-2' style={{ width: "18rem" }}>
              <img
                className='card-img-top img-fluid'
                src='https://source.unsplash.com/random/800x600'
                alt='courseImg'
              ></img>
              <div className='card-body'>
                <h5 className='card-title'>Lorem ipsum dolor sit amet.</h5>
                <p className='card-text'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Maiores, ab?
                </p>
                <p>150</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;

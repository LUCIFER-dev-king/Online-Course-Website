import React, { useState, useEffect } from "react";
import NormalCard from "../../component/NormalCard";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import firebase from "firebase/app";
import "firebase/firestore";
import "./learn.css";

const Learn = () => {
  const db = firebase.firestore();
  const [courseList, setCourseList] = useState([]);

  const getCourses = () => {
    var list = [];
    db.collection("courses")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          list.push(doc.data());
        });
        setCourseList(list);
      });
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <Header />

      <div
        className='bg-dark text-white d-flex align-items-center'
        style={{ height: "150px" }}
      >
        <div className='learnContainer'>
          <h2>Welcome to E-Learing Online</h2>
        </div>
      </div>

      <div className='learnContainer mt-3'>
        <section id='courses'>
          <div className='d-flex justify-content-between'>
            <h3>Courses</h3>
            <Link to='/learn/viewall'>View all</Link>
          </div>
          <div id='card' className='d-flex'>
            {courseList.map((course, id) => {
              return (
                <NormalCard
                  key={id}
                  title={course.courseName}
                  desc={course.courseDesc}
                  price={course.coursePrice}
                ></NormalCard>
              );
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
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Learn;

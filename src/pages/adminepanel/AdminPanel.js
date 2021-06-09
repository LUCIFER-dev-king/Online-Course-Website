import React, { useState, useEffect, useContext } from "react";
import "../learn/learn.css";
import Header from "../learn/Header";
import Footer from "../learn/Footer";
import { Link, useHistory } from "react-router-dom";
import { v4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import { UserContext } from "../../context/Context";

const AdminPanel = () => {
  const db = firebase.firestore();
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    db.collection("courses")
      .doc(v4())
      .set({
        courseName: courseName,
        courseDesc: courseDesc,
        coursePrice: coursePrice,
      })
      .then((doc) => {
        console.log("Course saved", doc.id);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  useEffect(() => {
    // if (!context.user?.isAdmin) {
    //   history.push("/signin");
    // }
  }, []);

  return (
    <div>
      <Header />
      <div className='learnConatiner'>
        <div className='row'>
          <div
            className='col-md-4 offset-md-4 mt-5 '
            style={{
              boxShadow: "2px 2px 1px #aaaaaa",
            }}
          >
            <section className='text-center'>
              <h1>Create a Course</h1>
            </section>

            <section className='p-4'>
              <form action=''>
                <label className='p-1' htmlFor='courseName'>
                  Name
                </label>
                <input
                  type='text'
                  name='courseName'
                  id='courseName'
                  className='form-control p-2'
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                <label className='p-1' htmlFor='coursePrice'>
                  Price
                </label>
                <input
                  type='text'
                  name='coursePrice'
                  id='coursePrice'
                  className='form-control p-2'
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
                <label className='p-1 mt-2' htmlFor='courseDesc'>
                  Course Description
                </label>
                <textarea
                  type='text'
                  name='courseDesc'
                  id='courseDesc'
                  className='form-control p-2'
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                />
                <label
                  className='p-1 mt-2'
                  htmlFor='formfile'
                  className='form-label'
                >
                  Pick your video
                </label>
                <input type='file' className='form-control' id='formfile' />
                <button
                  onClick={handleOnSubmit}
                  type='button'
                  className='btn btn-secondary w-100 rounded mt-3'
                >
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

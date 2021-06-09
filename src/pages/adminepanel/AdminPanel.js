import React from "react";
import "../learn/learn.css";
import Header from "../learn/Header";
import Footer from "../learn/Footer";
import { Link } from "react-router-dom";
const AdminPanel = () => {
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
                />
                <label className='p-1' htmlFor='coursePrice'>
                  Price
                </label>
                <input
                  type='text'
                  name='coursePrice'
                  id='coursePrice'
                  className='form-control p-2'
                />
                <label className='p-1 mt-2' htmlFor='courseDesc'>
                  Course Description
                </label>
                <textarea
                  type='text'
                  name='courseDesc'
                  id='courseDesc'
                  className='form-control p-2'
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

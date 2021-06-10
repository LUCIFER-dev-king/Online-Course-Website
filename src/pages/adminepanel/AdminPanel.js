import React, { useState, useEffect, useContext } from "react";
import "../learn/learn.css";
import Header from "../learn/Header";
import Footer from "../learn/Footer";
import { Link, useHistory } from "react-router-dom";
import { v4 } from "uuid";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { UserContext } from "../../context/Context";
import { createCourse } from "./helper/AdminHelper";

const AdminPanel = () => {
  const db = firebase.firestore();
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [videoName, setVideoName] = useState("");
  const context = useContext(UserContext);
  const history = useHistory();

  const videoUpload = async (e) => {
    const file = e.target.files[0];
    var metadata = {
      contentType: file.type,
    };

    const storageRef = await firebase.storage().ref();

    var uploadTask = storageRef.child(videoName).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // setIsUploading(true);
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            //setIsUploading(false);
            console.log("Uploading is false");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Uploading is in prgress");
            break;
        }

        if (progress == 100) {
          console.log("upload sucess");
          // setIsUploading(false);
          // toast("Uploading is finished", { type: "success" });
        }
      },
      (error) => {
        // toast("Something went wrong", { type: "error" });
      },
      () => {
        //callback
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            //setDownloadUrl(downloadUrl);
            console.log("Download URl", downloadUrl);
          })
          .catch((err) => console.log(err));
      }
    );
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //createCourse(courseName, courseDesc, coursePrice);
    await db.collection("videos").document(videoName).setData({
      finishedProcessing: false,
      videoName: videoName,
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
              <form onSubmit={handleOnSubmit}>
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
                <div className='mt-2 alert alert-warning'>
                  For testing purposes, Only one section and one video is
                  allowed
                </div>
                <label className='p-1' htmlFor='sectionName'>
                  Section Name
                </label>
                <input
                  type='text'
                  name='sectionName'
                  id='sectionName'
                  className='form-control p-2'
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                />
                <label className='p-1' htmlFor='videoName'>
                  Video Name
                </label>
                <input
                  type='text'
                  name='videoName'
                  id='videoName'
                  className='form-control p-2'
                  value={videoName}
                  onChange={(e) => setVideoName(e.target.value)}
                />
                <label
                  className='p-1 mt-2'
                  htmlFor='formfile'
                  className='form-label'
                >
                  Pick your video
                </label>
                <input
                  type='file'
                  className='form-control'
                  id='formfile'
                  accept='video/*'
                  multiple={false}
                  onChange={(e) => videoUpload(e)}
                />
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

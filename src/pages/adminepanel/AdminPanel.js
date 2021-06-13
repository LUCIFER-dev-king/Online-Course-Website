import React, { useState, useEffect, useContext } from "react";
import { imageConfig } from "../../config/imageConfig";
import { FaUser } from "react-icons/fa";
import { readAndCompressImage } from "browser-image-resizer";
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
import ProfilePlaceholder from "../../images/profilePlaceholder.jpg";

const AdminPanel = () => {
  const db = firebase.firestore();
  const [authorName, setAuthorName] = useState("");
  const [authorDesc, setAuthorDesc] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseTagLine, setCourseTagLine] = useState("");
  const [courseDiscount, setCourseDiscount] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState("");
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
        setIsVideoUploading(true);
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            setIsVideoUploading(false);
            console.log("Uploading is false");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Uploading is in prgress");
            break;
        }

        if (progress == 100) {
          console.log("upload sucess");
          setIsVideoUploading(false);
          console.log("Uploading is finished");
        }
      },
      (error) => {
        console.log("Something went wrong");
      },
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then((downloadUrl) => {
            console.log("Video Download URl", downloadUrl);
          })
          .catch((err) => console.log(err));
      }
    );
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    createCourse(
      courseName,
      courseDesc,
      coursePrice,
      videoName,
      sectionName,
      courseTagLine,
      authorDesc,
      authorName,
      profilePicUrl,
      courseDiscount,
      thumbnailUrl
    );
  };

  const profilePicker = async (e) => {
    try {
      const file = e.target.files[0];
      var metadata = {
        contentType: file.type,
      };

      let resizeImage = await readAndCompressImage(file, imageConfig);

      const storageRef = await firebase.storage().ref();

      var uploadTask = storageRef
        .child("AuthorImages/" + file.name)
        .put(resizeImage, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          setIsImageUploading(true);
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              setIsImageUploading(false);
              console.log("Uploading is false");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Uploading is in prgress");
              break;
          }

          if (progress == 100) {
            setIsImageUploading(false);
            console.log("Uploading is finished");
          }
        },
        (error) => {
          console.log("Something went wrong: ", error);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              setProfilePicUrl(url);
              console.log(downloadUrl);
            })
            .catch((err) => console.log(err));
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const thumbnailPicker = async (e) => {
    try {
      const file = e.target.files[0];
      var metadata = {
        contentType: file.type,
      };

      let resizeImage = await readAndCompressImage(file, imageConfig);

      const storageRef = await firebase.storage().ref();

      var uploadTask = storageRef
        .child("CourseThumbnails/" + courseName)
        .put(resizeImage, metadata);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          setIsThumbnailUploading(true);
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              setIsThumbnailUploading(false);
              console.log("Uploading is false");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Uploading is in prgress");
              break;
          }

          if (progress == 100) {
            setIsThumbnailUploading(false);
            console.log("Uploading is finished");
          }
        },
        (error) => {
          console.log("Something went wrong: ", error);
        },
        () => {
          uploadTask.snapshot.ref
            .getDownloadURL()
            .then((url) => {
              setThumbnailUrl(url);
              console.log(url);
            })
            .catch((err) => console.log(err));
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className='text-center'>
                  {isImageUploading ? (
                    <div className='spinner-border' role='status'></div>
                  ) : (
                    <div className='text-center'>
                      <label htmlFor='profilePicker' className='form-label'>
                        <img
                          src={
                            profilePicUrl !== null
                              ? profilePicUrl
                              : ProfilePlaceholder
                          }
                          alt='img'
                          class='img-rounded'
                          style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                          }}
                        />
                      </label>
                      <input
                        type='file'
                        name='image'
                        id='profilePicker'
                        accept='image/*'
                        multiple={false}
                        onChange={(e) => profilePicker(e)}
                        className='form-control'
                      />
                    </div>
                  )}
                </div>
                <label className='p-1' htmlFor='authorName'>
                  Author Name
                </label>
                <input
                  type='text'
                  name='authorName'
                  id='authorName'
                  className='form-control p-2'
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <label className='p-1' htmlFor='authorDesc'>
                  About Author
                </label>
                <textarea
                  type='text'
                  name='authorDesc'
                  id='authorDesc'
                  className='form-control p-2'
                  value={authorDesc}
                  onChange={(e) => setAuthorDesc(e.target.value)}
                />
                <label className='p-1' htmlFor='authorDesc'>
                  Course Name
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
                  Course Price
                </label>
                <input
                  type='text'
                  name='coursePrice'
                  id='coursePrice'
                  className='form-control p-2'
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
                <label className='p-1' htmlFor='courseDiscount'>
                  Course Discount
                </label>
                <input
                  type='text'
                  name='courseDiscount'
                  id='courseDiscount'
                  className='form-control p-2'
                  value={courseDiscount}
                  onChange={(e) => setCourseDiscount(e.target.value)}
                />
                {isThumbnailUploading ? (
                  <div className='spinner-border m-3' role='status'></div>
                ) : (
                  <label
                    className='p-1 mt-2'
                    htmlFor='formfile'
                    className='form-label'
                  >
                    Pick your course thumbnail
                  </label>
                )}
                <input
                  type='file'
                  name='image'
                  id='profilePicker'
                  accept='image/*'
                  multiple={false}
                  onChange={(e) => thumbnailPicker(e)}
                  className='form-control'
                />
                <label className='p-1 mt-2' htmlFor='courseTagLine'>
                  Course tag line
                </label>
                <textarea
                  type='text'
                  name='courseTagLine'
                  id='courseTagLine'
                  className='form-control p-2'
                  value={courseTagLine}
                  onChange={(e) => setCourseTagLine(e.target.value)}
                />
                <label className='p-1 mt-2' htmlFor='courseTagLine'>
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
                {isVideoUploading ? (
                  <div className='spinner-border m-3' role='status'></div>
                ) : (
                  <label
                    className='p-1 mt-2'
                    htmlFor='formfile'
                    className='form-label'
                  >
                    Pick your video
                  </label>
                )}

                <input
                  type='file'
                  className='form-control'
                  id='formfile'
                  accept='video/*'
                  multiple={false}
                  onChange={(e) => videoUpload(e)}
                />
                <button
                  onClick={handleOnSubmit}
                  type='button'
                  className={
                    isVideoUploading || isImageUploading || isThumbnailUploading
                      ? "btn btn-secondary w-100 mt-3 disabled"
                      : "btn btn-secondary w-100 mt-3"
                  }
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

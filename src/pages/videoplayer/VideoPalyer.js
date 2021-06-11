import React, { useState } from "react";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import "./videoplayer.css";
import ReactPlayer from "react-player/lazy";
import { useLocation } from "react-router-dom";

const VideoPalyer = () => {
  const [videosUrl, setVideosUrl] = useState("");
  const location = useLocation();
  const { courseName, courseDesc, coursePrice, id } = location.state.course;
  console.log(location.state.syllabus);
  const changeThePalyingVideo = (url) => {
    console.log(url);
    setVideosUrl(url);
  };

  return (
    <div id='courseVideo' style={{ overflow: "hidden" }}>
      <div className='row'>
        <section className='col-md-8' style={{ overflow: "scroll" }}>
          <div className='row'>
            <div className='col-1'>
              <FaArrowLeft className='back-icon' />
            </div>
            <div className='col-6 mt-2 d-flex align-items-center'>
              <h4>Author Name</h4>
            </div>
          </div>
          <section className='video-player'>
            <ReactPlayer width='100%' height='500px' controls url={videosUrl} />
          </section>
          <div className='row'>
            <div className='col-md-8'>
              <div className='course-header'>
                <h2>Course Name</h2>
              </div>
              <div className='course-desc'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                  porro?
                </p>
              </div>
              <div className='course-syllabus mt-4'>
                <h3>Syllabus</h3>
                <div className='accordion ' id='accordionExample'>
                  <div class='accordion-item'>
                    <h2 class='accordion-header' id='headingOne'>
                      <button
                        class='accordion-button'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#collapseOne'
                        aria-expanded='true'
                        aria-controls='#collapseOne'
                      >
                        Accordion Item #1
                      </button>
                    </h2>
                    <div
                      id='collapseOne'
                      class='accordion-collapse'
                      aria-labelledby='headingOne'
                      data-bs-parent='accordionExample'
                    >
                      <div class='accordion-body'>
                        <strong>
                          This is the first item's accordion body.
                        </strong>
                        It is shown by default, until the collapse plugin adds
                        the appropriate classes that we use to style each
                        element. These classes control the overall appearance,
                        as well as the showing and hiding via CSS transitions.
                        You can modify any of this with custom CSS or overriding
                        our default variables. It's also worth noting that just
                        about any HTML can go within the{" "}
                        <code>.accordion-body</code>, though the transition does
                        limit overflow.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='course-author mt-4'>
                <h4>Author</h4>
                <div className='row'>
                  <div className='col-1'>
                    <FaUser className='profile-icon' />
                  </div>
                  <div className='col-6 d-flex align-items-center'>
                    <h6>Author Name</h6>
                  </div>
                </div>

                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Consequuntur consectetur suscipit earum atque quos fuga iste
                  quis accusamus, beatae labore?
                </p>
              </div>
              <div className='course-abt my-5'>
                <h4>About This Course</h4>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className='course-faq'>
                <h4>FAQ</h4>
                <div className='course-faq-title'>
                  <strong>01 Lorem ipsum dolor sit amet?</strong>
                </div>
                <div className='course-faq-ans'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minus, quis?
                </div>
              </div>
            </div>
            <div className='col-md-4 courseCard'>
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
          </div>
        </section>
        <section className='col-md-4'>
          <h2>Syllabus</h2>
          {location.state.syllabus.map((sec, id) => (
            <div>
              <h4>{sec.id}</h4>
              <p>{sec.videoName}</p>
              <button
                onClick={() => {
                  changeThePalyingVideo(sec.videoUrl);
                }}
                type='button'
                className='btn btn-primary btn-block'
              >
                Play
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default VideoPalyer;

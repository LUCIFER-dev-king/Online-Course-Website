import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./learn.css";
import HeroImage from "../../images/heroImage.svg";

const ViewAll = () => {
  return (
    <div>
      <Header />
      <div className='learnContainer'>
        <div id='navigation' className='mt-4'>
          <h6>
            <a href=''>Store</a>
            <span> / </span>
            <a href=''>Courses</a>
          </h6>
        </div>
        <section id='courses' className='mt-3'>
          <h3>Courses</h3>
          <div id='couseList' className='m-1'>
            <div className='courseListItem p-2 border-top'>
              <div className='row py-2'>
                <div
                  className='col-2'
                  style={{
                    background: `url(https://source.unsplash.com/random)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    margin: "0rem 1rem",
                  }}
                ></div>

                <div className='col-6'>
                  <div className='courseItemCount'>
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    <p>Lorem, ipsum dolor.</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Totam, eligendi?
                    </p>
                  </div>
                </div>
                <div className='col-3' style={{ textAlign: "right" }}>
                  <h6 className=''>Free</h6>
                </div>
              </div>
            </div>
            <div className='courseListItem p-2 border-top'>
              <div className='row py-2'>
                <div
                  className='col-2'
                  style={{
                    background: `url(https://source.unsplash.com/random)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    margin: "0rem 1rem",
                  }}
                ></div>

                <div className='col-6'>
                  <div className='courseItemCount'>
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    <p>Lorem, ipsum dolor.</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Totam, eligendi?
                    </p>
                  </div>
                </div>
                <div className='col-3' style={{ textAlign: "right" }}>
                  <h6 className=''>Free</h6>
                </div>
              </div>
            </div>
            <div className='courseListItem p-2 border-top'>
              <div className='row py-2'>
                <div
                  className='col-2'
                  style={{
                    background: `url(https://source.unsplash.com/random)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    margin: "0rem 1rem",
                  }}
                ></div>

                <div className='col-6'>
                  <div className='courseItemCount'>
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    <p>Lorem, ipsum dolor.</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Totam, eligendi?
                    </p>
                  </div>
                </div>
                <div className='col-3' style={{ textAlign: "right" }}>
                  <h6 className=''>Free</h6>
                </div>
              </div>
            </div>
            <div className='courseListItem p-2 border-top'>
              <div className='row py-2'>
                <div
                  className='col-2'
                  style={{
                    background: `url(https://source.unsplash.com/random)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    margin: "0rem 1rem",
                  }}
                ></div>

                <div className='col-6'>
                  <div className='courseItemCount'>
                    <h5>Lorem ipsum dolor sit amet.</h5>
                    <p>Lorem, ipsum dolor.</p>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Totam, eligendi?
                    </p>
                  </div>
                </div>
                <div className='col-3' style={{ textAlign: "right" }}>
                  <h6 className=''>Free</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAll;

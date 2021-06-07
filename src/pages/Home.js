import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import HeroImage from "../images/heroImage.svg";
import ELearnImage from "../images/elearnImage.svg";
import MobileImage from "../images/mobileImage.svg";

const Home = () => {
  return (
    <div>
      <Header />
      <div className='container fluid'>
        <section className=' ' id='heroSection'>
          <div className='row vh-100 my-auto'>
            <div className='col-4 justify-content-center align-items-center my-auto'>
              <div className='d-block'>
                <h1>Learn Code Online</h1>
                <p>
                  Qulaity courses at affordable pricing, trsted by 300k+ users
                </p>
                <button type='button' className='btn btn-primary'>
                  Explore Couse Library
                </button>
              </div>
            </div>
            <div className='col-8 my-auto'>
              <img
                src={HeroImage}
                alt='Learning Image'
                className='img-fluid my-auto'
              />
            </div>
          </div>
        </section>

        <section className=' text-center' id='serviceSection'>
          <div className='row p-5'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5>Courses</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid excepturi laudantium doloribus laboriosam similique
                    perspiciatis fuga architecto officiis voluptas nostrum.
                  </p>
                  <button type='button' className='btn btn-outline-primary'>
                    Try free courses
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5>Coming soon</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid excepturi laudantium doloribus laboriosam similique
                    perspiciatis fuga architecto officiis voluptas nostrum.
                  </p>
                  <button type='button' className='btn btn-outline-primary'>
                    Coming soon
                  </button>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-body'>
                  <h5>Youtube</h5>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid excepturi laudantium doloribus laboriosam similique
                    perspiciatis fuga architecto officiis voluptas nostrum.
                  </p>
                  <button type='button' className='btn btn-outline-primary'>
                    Visit Channel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='bg-light' id='aboutUs'>
          <div className='row vh-100'>
            <div className='col-sm-6 my-auto'>
              <img
                src={ELearnImage}
                alt='learning'
                className='image-fluid my-auto'
              />
            </div>
            <div className='col-sm-6 my-auto p-5'>
              <h3>Get latest tech courses + Easy to follow videos</h3>
              <p>
                Tech and teaching are 2 different skills and we specialise in
                merging them. We follow easy 3 step process:
              </p>
              <p>
                Programming can be challenging and frustrating to learn. It can
                be tough to learn. In youtube videos, it seems all good, no bugs
                at all. We know this because we make those youtube videos.
                Programming needs a fair blend of teaching skills to make it
                understandable. Our speciality is to turn the tough topics in
                easy one
              </p>
              <button type='button' className='btn btn-outline-primary'>
                I Write Code
              </button>
            </div>
          </div>
        </section>

        <section id='feautres'>
          <div className='row vh-100'>
            <div className='col-md-4 my-auto'>
              <h3>Get latest tech courses + Easy to follow videos</h3>
              <p>
                Tech and teaching are 2 different skills and we specialise in
                merging them. We follow easy 3 step process:
              </p>
              <p>
                Programming can be challenging and frustrating to learn. It can
                be tough to learn. In youtube videos, it seems all good, no bugs
                at all. We know this because we make those youtube videos.
                Programming needs a fair blend of teaching skills to make it
                understandable. Our speciality is to turn the tough topics in
                easy one
              </p>
              <button type='button' className='btn btn-outline-primary'>
                I Write Code
              </button>
            </div>
            <div className='col-md-8 my-auto'>
              <img
                src={MobileImage}
                alt='learning'
                className='image-fluid my-auto'
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

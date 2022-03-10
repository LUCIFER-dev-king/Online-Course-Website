import React from "react";
import LandingHeader from "./LandingHeader";
import { Link } from "react-router-dom";
import { FaAward, FaBook, FaYoutube } from "react-icons/fa";
import HeroImage from "../../images/heroImage.svg";
import ELearnImage from "../../images/elearnImage.svg";
import "./home.css";

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <LandingHeader />
      <div className="container fluid">
        <section id="heroSection">
          <div className="row vh-100 hero">
            <div className="col-md-4 my-auto">
              <h1>Let's start learning</h1>
              <p>
                Quality courses at affordable pricing, trusted by 300k+ users
              </p>
              <button type="button" className="btn btn-primary  mt-2 mt-md-0">
                <Link to="/learn" className="text-light">
                  Explore Couse Library{" "}
                </Link>
              </button>
            </div>
            <div className="col-md-8 my-auto heroImage">
              <img src={HeroImage} alt="" className="img-fluid my-auto" />
            </div>
          </div>
        </section>
      </div>
      <section className="bg-light" id="aboutUs">
        <div className="row vh-100">
          <div className="col-sm-6 my-auto">
            <img
              src={ELearnImage}
              alt="learning"
              className="img-fluid my-auto"
            />
          </div>
          <div className="col-sm-6 my-auto p-5">
            <h3>Get latest tech courses + Easy to follow videos</h3>
            <p className=" mt-2 mt-md-0">
              Tech and teaching are 2 different skills and we specialise in
              merging them. We follow easy 3 step process:
            </p>
            <p className=" mt-2 mt-md-0">
              Programming can be challenging and frustrating to learn. It can be
              tough to learn. In youtube videos, it seems all good, no bugs at
              all. We know this because we make those youtube videos.
              Programming needs a fair blend of teaching skills to make it
              understandable. Our speciality is to turn the tough topics in easy
              one
            </p>
            <button
              type="button"
              className="btn btn-outline-primary mt-2 mt-md-0"
            >
              Let's begin
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

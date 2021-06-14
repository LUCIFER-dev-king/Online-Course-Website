import React from "react";
import Header from "../learn/Header";
import "./order.css";
import "../learn/learn.css";
import { useLocation, useHistory } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
const Order = () => {
  const location = useLocation();
  const history = useHistory();
  const {
    courseName,
    courseDesc,
    coursePrice,
    id,
    courseTagLine,
    courseDiscount,
    authorName,
    profilePicUrl,
    thumbnailUrl,
    authorDesc,
  } = location.state.course;
  var totalPrice = Math.floor(
    coursePrice - (coursePrice * courseDiscount) / 100
  );

  const makePayment = () => {
    var user = JSON.parse(localStorage.getItem("user"));
    createOrder(id, user).then((doc) => {
      if (doc) {
        console.log("saved");
      }
      history.push({
        pathname: `/learn/:courseName/syllabus`,
        state: {
          course: location.state.course,
          syllabus: location.state.syllabus,
        },
      });
    });
  };
  return (
    <div>
      <Header />
      <div className='learnContainer py-4 px-2'>
        <h3>Order Summary</h3>
        <div className='row'>
          <div className='col-md-7'>
            <div className='row p-2'>
              <div
                className='col-4'
                style={{
                  background: `url(${thumbnailUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  margin: "0rem 1rem",
                }}
              ></div>

              <div className='col-6'>
                <div className='courseItemCount'>
                  <h5>{courseName}</h5>
                  <p>{courseTagLine}</p>
                  <p>{courseDesc}</p>
                </div>
              </div>
            </div>

            <hr />

            <h4>Payment</h4>
            <p>Make payment for the course here</p>
            <button onClick={makePayment} className='btn btn-primary'>
              Pay Securely
            </button>
          </div>
          <div className='col-md-5'>
            <div className='card'>
              <div className='card-body'>
                <h5>Order Details</h5>
                <div className='d-flex justify-content-between'>
                  <p>Course Price</p>
                  <p>{coursePrice}</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Discount</p>
                  <p>{courseDiscount}%</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Coupon</p>
                  <p>Apply coupon</p>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                  <h5>Total</h5>
                  <h6>{totalPrice}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

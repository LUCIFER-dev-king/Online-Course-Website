import React from "react";
import Header from "../learn/Header";
import "./order.css";
import "../learn/learn.css";
const Order = () => {
  return (
    <div>
      <Header />
      <div className='learnContainer py-4 px-2'>
        <h3>Order Summary</h3>
        <div className='row'>
          <div className='col-md-7'>
            <div className='row p-2'>
              <div
                className='col-3'
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
                  <h5>sdf</h5>
                  <p>desc</p>
                  <p>desc</p>
                </div>
              </div>
            </div>

            <hr />

            <h4>Payment</h4>
            <p>Make payment for the course here</p>
            <button className='btn btn-primary'>Pay Securely</button>
          </div>
          <div className='col-md-5'>
            <div className='card'>
              <div className='card-body'>
                <h5>Order Details</h5>
                <div className='d-flex justify-content-between'>
                  <p>Course Price</p>
                  <p>2323</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Discount</p>
                  <p>-556</p>
                </div>
                <div className='d-flex justify-content-between'>
                  <p>Coupon</p>
                  <p>Apply coupon</p>
                </div>
                <hr />
                <div className='d-flex justify-content-between'>
                  <h5>Total</h5>
                  <h6>1256</h6>
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

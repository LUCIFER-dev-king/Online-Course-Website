import React, { useState } from "react";
import "./order.css";
import "../learn/learn.css";
import { useLocation, useHistory } from "react-router-dom";
import { createEnrollmentToUser, createOrder } from "./helper/orderHelper";
import Base from "../../layout/Base";
import axios from "axios";
import { v4 } from "uuid";
import OrderCard from "../../component/OrderCard";

const Order = () => {
  const location = useLocation();
  var user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const courseList = location.state.courseList;
  var totalPriceOfCourses = 0;
  var courseIdList = [];
  // const [totalPrice, setTotalPrice] = useState(0);
  const [orderIdForDb, setOrderIdForDb] = useState("");
  if (courseList.length > 0) {
    courseList.forEach((item) => {
      totalPriceOfCourses += Math.floor(
        item.coursePrice - (item.coursePrice * item.courseDiscount) / 100
      );
      courseIdList.push(item.id);
    });
  }

  var razorpayOptions = {
    key: "rzp_test_IFQustgDiURPOh",
    currency: "INR",
    name: "Acme Corp",
    description: "Test Transaction",
    handler: function (response) {
      console.log(response);
      verifyPayment(response);
    },
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#303030",
    },
  };

  const makePayment = (e) => {
    e.preventDefault();

    setOrderIdForDb(v4());
    axios(
      "http://localhost:5001/e-learn-website/us-central1/paymentFunctions/makepayment",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          amount: totalPriceOfCourses * 100,
          orderId: orderIdForDb,
        }),
      }
    )
      .then((res) => {
        console.log(res.data);
        var razor = new window.Razorpay({
          ...razorpayOptions,
          order_id: res.data.id,
          amount: res.data.amount,
        });
        razor.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const verifyPayment = (response) => {
    axios(
      "http://localhost:5001/e-learn-website/us-central1/paymentFunctions/verifypayment",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: JSON.stringify(response),
      }
    )
      .then((res) => {
        console.log(res.data);
        createEnrollmentToUser(courseIdList, user);
        createOrder(courseIdList, user, orderIdForDb).then((doc) => {
          if (doc) {
            console.log("saved");
          }
          history.push("/learn");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base>
      <div className="container py-4 px-2 mt-3">
        <h3 className="fw-bolder">Order Summary</h3>
        <div class="row">
          <div class="col-7">
            <div className="d-flex flex-column">
              {courseList.map((course, id) => (
                <div key={id} className="mt-2">
                  <OrderCard course={course} />
                </div>
              ))}
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h5>Order Details</h5>
                {courseList.map((course, id) => {
                  return (
                    <div key={id} className="d-flex justify-content-between">
                      <p>Course Price #{id + 1}</p>
                      <p>₹{course.coursePrice}</p>
                    </div>
                  );
                })}

                <div className="d-flex justify-content-between">
                  <p>Discounts</p>
                  <p>All discounts are applied</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <h5>Total</h5>
                  <h5>₹{totalPriceOfCourses}</h5>
                </div>
              </div>
            </div>
            <div
              onClick={makePayment}
              style={{ cursor: "pointer" }}
              className="bg-dark text-uppercase mt-3 text-center w-100 text-light px-4 py-3 fw-bold"
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Order;

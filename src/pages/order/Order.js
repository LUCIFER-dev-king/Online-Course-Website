import React, { useState } from "react";
import "../learn/learn.css";
import { useLocation, useHistory } from "react-router-dom";
import {
  createEnrollmentToUser,
  createOrder,
  removeCartList,
} from "./helper/orderHelper";
import Base from "../../layout/Base";
import axios from "axios";
import { v4 } from "uuid";
import OrderCard from "../../component/OrderCard";
import { auth } from "../../config/firebaseconfig";

const Order = () => {
  const location = useLocation();
  var user = JSON.parse(localStorage.getItem("user"));
  const history = useHistory();
  const courseList = location.state.courseList;
  const [loading, setLoading] = useState(false);
  var totalPriceOfCourses = 0;
  var courseIdList = [];

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
    name: "E Learn",
    description: "Test Transaction",
    handler: function (response) {
      console.log(response);
      verifyPayment(response);
    },
    prefill: {
      name: auth.currentUser === null ? "Test" : auth.currentUser.displayName,
      email: user.email,
      contact: "8874883789",
    },
    theme: {
      color: "#303030",
    },
    modal: {
      ondismiss: () => {
        setLoading((prev) => !prev);
      },
    },
    config: {
      display: {
        blocks: {
          hdfc: {
            name: "Pay using via cards",
            instruments: [
              {
                method: "card",
                types: ["debit", "credit"],
              },
            ],
          },
        },
        hide: [
          {
            method: "upi",
          },
        ],
        sequence: ["block.hdfc", "block.other"],
        preferences: {
          show_default_blocks: false,
        },
      },
    },
  };

  const makePayment = (e) => {
    e.preventDefault();
    //"http://localhost:5001/e-learn-website/us-central1/paymentFunctions/makepayment"
    setOrderIdForDb(v4());
    axios(
      "https://us-central1-e-learn-website.cloudfunctions.net/paymentFunctions/makepayment",
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
        setLoading(true);
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
    //"http://localhost:5001/e-learn-website/us-central1/paymentFunctions/verifypayment"
    axios(
      "https://us-central1-e-learn-website.cloudfunctions.net/paymentFunctions/verifypayment",
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
          if (courseList.length > 0) {
            removeCartList(user.uid);
          }
          setLoading(false);
          history.push("/learn");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Base>
      {loading ? (
        <div
          className="m-0 p-0 d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            opacity: "0.4",
            backgroundColor: "#fff",
            zIndex: "2",
          }}
        >
          <div className="spinner-border" role="status"></div>
        </div>
      ) : (
        ""
      )}
      <div style={{ zIndex: "1" }} className="container py-4 px-2 mt-3">
        <h3 className="fw-bolder">Order Summary</h3>
        <div className="row">
          <div className="col-7">
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

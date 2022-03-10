import React, { useEffect, useState } from "react";
import NormalCard from "../../component/NormalCard";
import Base from "../../layout/Base";
import { useHistory } from "react-router-dom";
import { getListOfCartCourses, getUserCart } from "./helper/cartHelper";

const Cart = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [cartList, setCartList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user !== null) {
      getUserCart(user.uid).then((res) => {
        if (res !== undefined) {
          res.forEach((doc) => {
            getListOfCartCourses(doc).then((result) => {
              setCartList((prev) => [...prev, result]);
            });
          });
        }
      });
    }
  }, []);

  return (
    <Base>
      <div className="container">
        <div className="mt-5 d-md-flex justify-content-between align-items-center">
          <h3 className="m-0 fs-3 fw-bolder">My Cart</h3>
          {cartList.length > 0 ? (
            <div className="mt-3 mt-lg-0">
              <div
                onClick={() => {
                  history.push({
                    pathname: "/learn/courses/order",
                    state: {
                      courseList: cartList,
                    },
                  });
                }}
                style={{ cursor: "pointer" }}
                className="d-inline  bg-light border border-dark mt-3 text-center  text-dark px-4 py-2 fw-bold"
              >
                Proceed to chekout
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="mt-3">
          {cartList.length > 0 ? (
            <div>
              <div className="row">
                {cartList.map((cart, id) => {
                  return (
                    <div
                      key={id}
                      className="col-sm col-lg-3 mt-2"
                      style={{ height: "320px" }}
                    >
                      <NormalCard
                        course={cart}
                        fromCart={true}
                        user={user}
                        setCartList={setCartList}
                        cartList={cartList}
                      ></NormalCard>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-muted">Please add some courses to cart.</div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;

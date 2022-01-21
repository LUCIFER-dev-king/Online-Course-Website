import React, { useEffect, useState } from "react";
import NormalCard from "../../component/NormalCard";
import Base from "../../layout/Base";
import { useHistory } from "react-router-dom";
import {
  getListOfCartCourses,
  getUserCart,
  removeCartItem,
} from "./helper/cartHelper";

const Cart = () => {
  var user = JSON.parse(localStorage.getItem("user"));
  const [cartList, setCartList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user != null) {
      getUserCart(user.uid).then((res) => {
        res.forEach((doc) => {
          getListOfCartCourses(doc.courseId).then((result) => {
            var addIn = { ...result, cartListId: doc.cartListId };
            setCartList((prev) => [...prev, addIn]);
          });
        });
      });
    }
  }, []);

  const removeItemHandler = (cart) => {
    removeCartItem(user.uid, cart.cartListId).then((res) => {
      if (res) {
        var filtered = cartList.filter(
          (item) => item.cartListId !== cart.cartListId
        );
        setCartList(filtered);
      }
    });
  };
  return (
    //TODO: After checkout clear the cart in users Firestore.
    //TODO: Add remove item.
    <Base>
      <div class="container">
        <div class="mt-5 d-md-flex justify-content-between align-items-center">
          <h3 className="m-0 fs-3 fw-bolder">My Cart</h3>
          {cartList.length > 0 ? (
            //TODO: Loost pathname:- cartList[0] change the url.
            <div className="mt-3 mt-lg-0">
              <div
                onClick={() => {
                  history.push({
                    pathname: `/learn/${cartList[0].courseName}/order`,
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
        <div class="mt-3">
          {cartList.length > 0 ? (
            <div id="card" className="d-md-flex">
              {cartList.map((cart, id) => {
                return (
                  <div className="p-2">
                    <NormalCard key={id} course={cart}></NormalCard>
                    <div
                      onClick={() => {
                        removeItemHandler(cart);
                      }}
                      style={{ cursor: "pointer" }}
                      className="rounded bg-dark mt-1 text-center w-100 text-light px-4 py-2 fw-bold"
                    >
                      Remove from cart
                    </div>
                  </div>
                );
              })}
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

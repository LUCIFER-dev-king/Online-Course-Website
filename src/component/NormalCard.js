import React from "react";
import ReviewStar from "../component/ReviewStar";
import { useHistory } from "react-router-dom";
import "./component.css";
import { removeCartItem } from "../pages/cart/helper/cartHelper";

const NormalCard = ({ course, fromCart, user, setCartList, cartList }) => {
  let history = useHistory();
  const {
    courseName,
    coursePrice,
    authorName,
    thumbnailUrl,
    courseDiscount,
    rating,
    cartListId,
    id,
  } = course;
  const sendToCourseDesc = () => {
    history.push({
      pathname: `/learn/${courseName}`,
      state: {
        course: course,
      },
    });
  };

  const removeItemHandler = () => {
    removeCartItem(user.uid, id).then((res) => {
      if (res) {
        var filtered = cartList.filter((item) => item.id !== id);
        setCartList(filtered);
      }
    });
  };
  return (
    <div
      id="course-card"
      className="h-100 "
      style={{ width: "18rem", cursor: "pointer" }}
    >
      <div onClick={sendToCourseDesc} className="normalCard">
        <img
          className="card-img-top hover-zoom"
          src={thumbnailUrl}
          alt="courseImg"
        ></img>
      </div>

      <div className="card-body p-0 ps-1 py-2">
        <h5 className="card-title fw-bolder m-0">{courseName}</h5>
        <p className="card-text text-muted">{authorName}</p>
        <div className="d-flex align-items-center">
          <div style={{ color: "#e59819" }} className="fw-bolder mt-1">
            {rating}
          </div>
          <div className="ms-2">
            <ReviewStar starCount={rating} />
          </div>
        </div>

        <div className="d-flex mt-1">
          <p className="px-1">
            <del>₹{coursePrice}</del>
          </p>
          <p className="px-2 fw-bolder">
            ₹{Math.floor(coursePrice - (coursePrice * courseDiscount) / 100)}
          </p>
          <p>{courseDiscount}% off</p>
        </div>

        {fromCart ? (
          <div
            onClick={() => {
              removeItemHandler();
            }}
            style={{ cursor: "pointer" }}
            className="rounded bg-dark mt-1 text-center w-100 text-light px-4 py-2 fw-bold"
          >
            Remove from cart
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default NormalCard;

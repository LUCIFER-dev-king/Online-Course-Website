import React from "react";
import "./component.css";

const NormalCard = ({ title, price, desc }) => {
  return (
    <div className='card m-2' style={{ width: "18rem" }}>
      <div className='normalCard'>
        <img
          className='card-img-top hover-zoom'
          src='https://source.unsplash.com/random'
          alt='courseImg'
        ></img>
      </div>

      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{desc}</p>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default NormalCard;

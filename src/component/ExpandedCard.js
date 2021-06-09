import React from "react";

const ExpandedCard = ({ title, price, desc }) => {
  return (
    <div className='courseListItem p-2 border-top'>
      <div className='row py-2'>
        <div
          className='col-2'
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
            <h5>{title}</h5>
            <p>{desc}</p>
            <p>{desc}</p>
          </div>
        </div>
        <div className='col-3' style={{ textAlign: "right" }}>
          <h6 className=''>{price}</h6>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCard;

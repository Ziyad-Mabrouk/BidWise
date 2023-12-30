import React, { useState, useEffect } from 'react';
import "../Styles/Product.css";
import { Link } from 'react-router-dom';

const MyItem = ({ product }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(product.enddate));

  useEffect(() => {
    // Update remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(product.enddate));
    }, 1000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [product.enddate]);

  function calculateRemainingTime(enddate) {
    const now = new Date().getTime();
    const endTime = new Date(enddate).getTime();
    let timeDiff = endTime - now;
  
    if (timeDiff < 0) {
      // If the time has already expired, set remaining time to 0
      timeDiff = 0;
    }
  
    const totalSeconds = Math.floor(timeDiff / 1000);
  
    const days = Math.min(Math.floor(totalSeconds / (24 * 3600)), 99);
    const remainingSeconds = totalSeconds % (24 * 3600);
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    //const seconds = remainingSeconds % 60;
  
    // Format values with leading zeros
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    //const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedDays}:${formattedHours}:${formattedMinutes}`;
  }
  

  return (
    <div className='product'>
      <div className='image'>
        <img src={product.image} alt='product' id="product-image" />
        <div className='price'>
          <p id="top-bid">Top Bid:</p>
          <p id="product-price">{product.price + ' MAD'}</p>
        </div>
      </div>

      <div className='details'>
        <div className='text'>
          <h1 id="product-title">
            {product.name.length <= 16
                ? product.name
                : `${product.name.slice(0, 14)}...`}
          </h1>
          <p id="product-description">
            {product.name.length <= 60
                ? product.name
                : `${product.name.slice(0, 60)}...`}
          </p>
        </div>

        <div className='timer'>
          <p id="ends-in">Ends in:</p>
          <p id="expiration-time">{remainingTime}</p>
          <div className='labels'>
            <p className="label" id="label-days">Days</p>
            <p className="label" id="label-hours">Hours</p>
            <p className="label" id="label-minutes">Minutes</p>
          </div>
        </div>

        <div className='product-buttons'>
          <Link to={"/BidWise/Product/" + product.name}>
                <button id="view-details-btn">View Details</button>
          </Link>
          <button id="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MyItem;
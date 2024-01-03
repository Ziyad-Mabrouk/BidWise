import React, { useState, useEffect } from 'react';
import "../Styles/MyItem.css";
import { Link } from 'react-router-dom';
import ProductContext from "../ProductContext";
import { useContext } from 'react';
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const MyItem = ({ product }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime(product.enddate));
  const { setSelectedProduct } = useContext(ProductContext);


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
    const seconds = remainingSeconds % 60;
  
    // Format values with leading zeros
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
  
    return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  const handleDelete = async () => {
    const productDocRef = doc(db, "itemdetails", product.id);
    try {
      await deleteDoc(productDocRef);
      alert("Item successfully deleted!");
    } catch (error) {
      alert("Error deleting item!");
      console.error("Error removing Item: ", error);
    }
  };

  const handleViewDetailsClick = () => {
    setSelectedProduct(product);
  };

  const handleEnd = async () => {
    const productDocRef = doc(db, "itemdetails", product.id);
    try {
      await updateDoc(productDocRef,{
        endDate: new Date().toISOString(),
      });
      alert("Item successfully ended!");
    } catch (error) {
      alert("Error ending item!");
      console.error("Error ending Item: ", error);
    }
  };
    


  return (
    <div className='my-item'>
      <div className='my-item-image'>
        <img src={product.image} alt='product' id="product-image" />
        <div className='price'>
          <p id="top-bid">Top Bid:</p>
          <p id="product-price">{product.price + ' MAD'}</p>
        </div>
      </div>

      <div className='my-item-details'>
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

        <div className='my-item-timer'>
          <p id="ends-in">Ends in:</p>
          <p id="expiration-time">{remainingTime}</p>
          <div className='labels'>
            <p className="label" id="my-item-label-days">Days</p>
            <p className="label" id="my-item-label-hours">Hours</p>
            <p className="label" id="my-item-label-minutes">Minutes</p>
            <p className="label" id="my-item-label-seconds">Seconds</p>
          </div>
        </div>

        <div className='product-buttons'>
          <Link to={"/BidWise/ProductDetails/" + product.id}>
                <button id="details-btn" onClick={handleViewDetailsClick}>Details</button>
          </Link>
          <button id="end-btn" onClick={handleEnd}>End</button>
          <button id="my-item-delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default MyItem;
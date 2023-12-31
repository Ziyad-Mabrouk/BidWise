import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ultrasonic_sensor from '../Images/ultrasonic-sensor.png';
import verify_bot from '../Images/verify-bot.png';
import happy_bot from '../Images/happy-bot.png';
import { Link } from 'react-router-dom';
import '../Styles/HumanVerification.css';
import { useContext } from 'react';
import UserContext from '../UserContext';

const HumanVerification = () => {
  const { username } = useContext(UserContext);
  const [currentDistance, setCurrentDistance] = useState(2000);
  const [isHuman, setIsHuman] = useState(false)
  const [distanceColor, setDistanceColor] = useState("distance-far")

  const fetchData = async () => {
    try {
      //get from server.js instead of directly getting from the flask server on the raspberry pi
      const response = await axios.get('http://localhost:3001/get_distance')
      console.log(response);
      const distance = response.data.distance;
      setCurrentDistance(distance);
      console.log("Distance received from server: " + distance + "cm");
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every 1 second

    return () => clearInterval(interval); // Cleanup on unmount or re-render
  }, []); // Empty dependency array ensures the effect runs once on mount

  useEffect(() => {
    const updateColor = () => {
      if (currentDistance < 20) {
        setDistanceColor('distance-close');
        setIsHuman(true);
      } else {
        setDistanceColor('distance-far');
      }
    };

    updateColor(); // Initial color update

    // Update color whenever currentDistance changes
    if (currentDistance) {
      updateColor();
    }
  }, [currentDistance]);

  return (
    <div className='human-verification'>
        <h1 id='hv-h1'>Human Verification</h1>
        <p className='hv-username'>Hello {username}!</p>
        <p className='hv-text'>To verify that you are human, please put your hand close to the ultrasonic sensor.</p>
        <div className='hv-div'>
            <div className='bot-div'>
                {isHuman ? (
                    <img id='happy-bot-img' src={happy_bot} alt="happy bot"/>
                ) : (
                    <img id='verify-bot-img' src={verify_bot} alt="verify bot"/>
                )}
            </div>

            <div className='distance-div'>

                <div className='distance-and-img-div'>
                    <div className='distance-box'>
                        <h1 id='distance-box-h1'>Distance</h1>
                        <p id={distanceColor}>{currentDistance.toFixed(2)} cm</p>
                    </div>
                    <img id="sensor-img" src={ultrasonic_sensor} alt="ultrasonic_sensor"/>
                </div>      

                {isHuman ? (
                        <>
                            <p className='response-text'>Distance verified!</p>
                            <Link to="/BidWise/">
                                <button id='done-btn'>Done</button>
                            </Link>
                        </>
                    ) : (
                        <p className='response-text'>Please don't put your hand directly on the sensor.</p>
                )}    
            </div>
            
        </div>
    </div>
  );
};

export default HumanVerification;

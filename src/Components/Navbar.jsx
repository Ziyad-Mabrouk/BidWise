import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import UserContext from "../UserContext";

import logo from '../Images/logo.svg'
import "../Styles/Navbar.css"
import electronics from '../Images/electronics.png'
import art from '../Images/art.png'
import furniture from '../Images/furniture.png'
import clothes from '../Images/clothes.png'
import special from '../Images/special.png'
import others from '../Images/others.png'

import down from '../Images/down-arrow.svg'
import down_hover from '../Images/down-arrow-hover.svg'
import my_items from '../Images/item.png'
import my_bids from '../Images/auction.png'
import settings from '../Images/setting.png'
import { set } from 'react-hook-form';

const Navbar = () => {
  //get the username from useContext
  const { username } = useContext(UserContext);
  const { setUsername } = useContext(UserContext);

  const OnLogout = () => {
    //logout the user
    alert("Logged out");
    setUsername('');
  };

  // States to manage dropdown visibility
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Function to handle dropdown visibility
  const handleDropdown = () => {
    setShowCategories(!showCategories);
  };

  // Function to handle user menu visibility
  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <div className='navbar'>
        <img src={logo} alt='logo' id="logo"/>
        <div className='links'>
            <Link to='/BidWise/'>Home</Link>
  
            <Link to='/BidWise/'>
                <div className='categories' onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
                  <span>Categories</span>
                  <img src={showCategories ? down_hover : down} alt='down arrow' id='down-arrow'/>
                  {showCategories && (
                    <div className='dropdown-content'>
                      <Link to='/BidWise/' className='category'>
                        <img src={electronics} alt='electronics'className='category-img'/>
                        <span>Elecronics</span>
                      </Link>

                      <Link to='/BidWise/' className='category'>
                        <img src={art} alt='art'className='category-img'/>
                        <span>Art</span>
                      </Link>

                      <Link to='/BidWise/' className='category'>
                        <img src={furniture} alt='furniture'className='category-img'/>
                        <span>Furniture</span>
                      </Link>

                      <Link to='/BidWise/' className='category'>
                        <img src={clothes} alt='clothes and accessories'className='category-img'/>
                        <span>Clothes & Accessories</span>
                      </Link>

                      <Link to='/BidWise/' className='category'>
                        <img src={special} alt='special items'className='category-img'/>
                        <span>Special Items</span>
                      </Link>

                      <Link to='/BidWise/' className='category'>
                        <img src={others} alt='others'className='category-img'/>
                        <span>Others</span>
                      </Link>
                    </div>
                  )}
                </div>
            </Link>

            <Link to='/BidWise/Sell/'>Sell</Link>
            <Link to='/BidWise/AboutUs/'>About Us</Link>
        </div>
        <div className='buttons'>
          {
            username === '' ? (
              <>
                <Link to="/BidWise/Login/"><button id='login-button'>Login</button></Link>
                <Link to="/BidWise/SignUp/"><button id='signup-button'>Start Bidding</button></Link>
              </>
            ) : (
              <>
                <div className='user-menu' onMouseEnter={handleUserMenu} onMouseLeave={handleUserMenu}>
                  {/* Display user circle with first letter */}
                  <div className='user-circle'>{username.charAt(0)}</div>

                  {/* Display user menu options */}
                  {showUserMenu && (
                    <div className='user-dropdown'>
                      <div className='username-display'>
                        <p className='logged-in-as'>Logged in as:</p>
                        <p className='username'>{username}</p>
                      </div>
                        
                      <Link to='/BidWise/MyItems/' className='user-option'>
                        <img src={my_items} alt='my items' className='user-option-img'/>
                        <p>My Items</p>
                      </Link>

                      <Link to='/BidWise/MyBids/' className='user-option'>
                        <img src={my_bids} alt='my bids' className='user-option-img'/>
                        <p>My Bids</p>
                      </Link>

                      <Link to='/BidWise/Settings/' className='user-option'>
                        <img src={settings} alt='settings' className='user-option-img'/>
                        <p>Settings</p>
                      </Link>
                    </div>
                  )}
                </div>
                <button id='login-button' onClick={OnLogout}>Log Out</button>
              </>
            )
          }
            {/*
            <Link to="/BidWise/Login/"><button id='login-button'>Login</button></Link>
            <Link to="/BidWise/SignUp/"><button id='signup-button'>Start Bidding</button></Link>
                  */}
        </div>
    </div>
  )
}

export default Navbar

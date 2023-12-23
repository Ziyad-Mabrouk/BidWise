import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.svg'
import "../Styles/Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='logo'>
            <img src={logo} alt='logo'/>
        </div>
        <div className='links'>
            <Link to='/bidwise/home'>Home</Link>
            <Link to='/bidwise/home'>Categories</Link>
            <Link to='/bidwise/home'>Sell</Link>
            <Link to='/bidwise/home'>About Us</Link>
        </div>
        <div className='buttons'>
            <button id='login-button'>Login</button>
            <button id='signup-button'>Start Bidding</button>
        </div>
    </div>
  )
}

export default Navbar

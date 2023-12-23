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
            <Link to='/'>Home</Link>
            <Link to='/'>Categories</Link>
            <Link to='/'>Sell</Link>
            <Link to='/'>About Us</Link>
        </div>
        <div className='buttons'>
            <button id='login-button'>Login</button>
            <button id='signup-button'>Start Bidding</button>
        </div>
    </div>
  )
}

export default Navbar

import React from 'react'
import bid_img from '../Images/3d_bid.png'
import '../Styles/BottomBanner.css'
import { Link } from 'react-router-dom'

const BottomBanner = () => {
  return (
    <div className='bottom_banner'>
        <p id='btm_text'>Looking to put your own Items up for bid, <br/>start by creating an account.</p>
        <Link to="/BidWise/SignUp/"><button id="create_account_button">Create An Account</button></Link>
        <img id ='bid_img' src={bid_img} alt='create_an_account'/>
    </div>
  )
}

export default BottomBanner

import React from 'react'
import logo_name from '../Images/bidwise_name.svg'
import gavel from '../Images/3d_gavel.png'
import "../Styles/TopBanner.css"


const TopBanner = () => {
  return (
    <div className='top_banner'>
      <img id ='headline' src={logo_name} alt='bidwise'/>
      <p id='description'>Online bidding made available in Morocco, <br/>with optimal prices and maximum security.</p>
      <img id='gavel' src={gavel} alt='gavel'/>
    </div>
  )
}

export default TopBanner

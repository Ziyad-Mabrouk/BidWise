import React, { useState, useEffect } from 'react'
import logo from '../Images/bidwise.svg'
import idriss from '../Images/idriss.jpg'
import ziyad from '../Images/ziyad.jpeg'
import mohamed from '../Images/mohamed.jpeg'
import ibrahim from '../Images/ibrahim.jpg'
import aimane from '../Images/aimane.jpeg'
import inpt from '../Images/inpt.png'

import '../Styles/AboutUs.css'

const AboutUs = () => {
  return (
    <div className='about-us'>
      <img id="bidwise-logo" src={logo} alt='bidwise logo'/>
      <p id="bidwise-slogan">Online Bidding Made Available In Morocco!</p>
      <h1 className="about-us-h1">Personal and Professional Project</h1>
      <p className='sud'>SUD-CLOUD&IoT 2023-2024</p>
      <p className='about-us-sub'>Contributors:</p>
      <div className="contributors">
        <div className='contributor'>
          <img className="contributor-img" src={idriss} alt="Krima Idriss"/>
          <p className='contributor-name'>Krima Idriss</p>
        </div>

        <div className='contributor'>
          <img className="contributor-img" src={mohamed} alt="Quehlaoui Mohamed"/>
          <p className='contributor-name'>Quehlaoui Mohamed</p>
        </div>

        <div className='contributor'>
          <img className="contributor-img" src={ziyad} alt="Mabrouk Ziyad"/>
          <p className='contributor-name'>Mabrouk Ziyad</p>
        </div>

        <div className='contributor'>
          <img className="contributor-img" src={ibrahim} alt="Lansari Ibrahim"/>
          <p className='contributor-name'>Lansari Ibrahim</p>
        </div>

        <div className='contributor'>
          <img className="contributor-img" src={aimane} alt="Achach Aimane"/>
          <p className='contributor-name'>Achach Aimane</p>
        </div>
      </div>

      <p className='about-us-sub'>Superevised by: Pr. Idrissi Hamza Kamal</p>

      <img id="inpt-logo" src={inpt} alt='inpt logo'/>
    </div>
  );
};

export default AboutUs;

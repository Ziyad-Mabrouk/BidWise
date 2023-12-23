import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../Images/logo.png'
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <h1 id="footer-headline">Contact</h1>

        <div className='infos'>
            <div className='contact-infos'>
                <h1 className="info">bidwise.contact@gmail.com</h1>
                <h1 className="info">+212 637-452248</h1>
                <h1 className="info">INPT, Av Allal Al Fassi, Madinat Al Irfane, Rabat, Maroc</h1>
                <Link to='/' id="about-us-link">About Us</Link>
            </div>

            <div className='send-message'>
                <input id="email-input" type="email" placeholder="Email"/>
                <textarea id="text-input" placeholder="Message"></textarea>
                <button id="send-button">Send</button>
            </div>
        </div>

        <div className='copyright'>
            <h1>Bid<i>Wise</i></h1>
            <h1>© Copyright {new Date().getFullYear()}</h1>
        </div>
    </div>
  )
}

export default Footer

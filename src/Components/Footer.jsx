import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Footer.css'
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs.sendForm('service_0bd09dh', 'template_4cfc8r2', form.current, 'PqgXZBqOSwFMTv56_')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        alert("Your message has been sent successfully!");
        document.getElementById("email-input").value = "";
        document.getElementById("text-input").value = "";
    };

    return (
        <div className='footer'>
            <h1 id="footer-headline">Contact</h1>

            <div className='infos'>
                <div className='contact-infos'>
                    <h1 className="info">bidwise.contact@gmail.com</h1>
                    <h1 className="info">+212 637-452248</h1>
                    <h1 className="info">INPT, Av Allal Al Fassi, Madinat Al Irfane, Rabat, Maroc</h1>
                    <Link to='/BidWise/AboutUs/' id="about-us-link">About Us</Link>
                </div>

                <form ref={form} onSubmit={sendEmail} className='send-message'>
                    <input id="email-input" type="email" placeholder="Email" name="user_email" />
                    <textarea id="text-input" placeholder="Message" name="message" />
                    <input id="send-button" type="submit" value="Send"/>
                </form>

            </div>

            <div className='copyright'>
                <h1>Bid<i>Wise</i></h1>
                <h1>© Copyright {new Date().getFullYear()}</h1>
            </div>
        </div>
    )
}

export default Footer

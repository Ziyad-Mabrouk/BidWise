import React from 'react'
import TopBanner from '../Components/TopBanner'
import Products from '../Components/Products'
import "../Styles/Home.css"
import BottomBanner from '../Components/BottomBanner'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className='Home'>
        <TopBanner />
        <h1 id="sect_title">Listed Bids</h1>
        <Products />
        <BottomBanner />
        <Footer />
    </div>
  )
}

export default Home

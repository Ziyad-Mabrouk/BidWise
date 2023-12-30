import React from 'react'
import TopBanner from '../Components/TopBanner'
import Products from '../Components/Products'
import "../Styles/Home.css"
import BottomBanner from '../Components/BottomBanner'
import { useContext } from 'react'
import UserContext from '../UserContext'
import Categories from '../Components/Categories'
import LoggedInBanner from '../Components/LoggedInBanner'

const Home = () => {
  const { username } = useContext(UserContext);

  return (
    <div className='Home'>
        {username ?  <Categories/> : <TopBanner/>}
        <h1 id="sect_title">Listed Bids</h1>
        <Products />
        {username ?  <LoggedInBanner/> : <BottomBanner />}
    </div>
  )
}

export default Home

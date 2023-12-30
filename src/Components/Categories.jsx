import React from 'react'
import '../Styles/Categories.css'

import electronics from '../Images/electronics.png'
import art from '../Images/art.png'
import furniture from '../Images/furniture.png'
import clothes from '../Images/clothes.png'
import special from '../Images/special.png'
import others from '../Images/others.png'

const Categories = () => {
  return (
    <div className='categories-div'>
        <h1 id="categories-headline">Categories</h1>
        
        <div className='categories-container-div'>
            <div className='category-card'>
                <img src={electronics} alt='electronics'className='category-image'/>
                <span>Electronics</span>
            </div>
            <div className='category-card'>
                <img src={art} alt='art' className='category-image'/>
                <span>Art</span>
            </div>
            <div className='category-card'>
                <img src={furniture} alt='furniture' className='category-image'/>
                <span>Furniture</span>
            </div>
            <div className='category-card'>
                <img src={clothes} alt='clothes' className='category-image'/>
                <span>Clothes</span>
            </div>
            <div className='category-card'>
                <img src={special} alt='special' className='category-image'/>
                <span>Special</span>
            </div>
            <div className='category-card'>
                <img src={others} alt='all' className='category-image'/>
                <span>All</span>
            </div>
        </div>
    </div>
  )
}

export default Categories

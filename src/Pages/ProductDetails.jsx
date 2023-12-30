import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/ProductDetails.css'
import back from '../Images/back.png'
//import product_img from '../Images/product 1.png'
import up from '../Images/up.png'
import down from '../Images/down.png'
import heart from '../Images/heart.png'
import share from '../Images/share.png'
import report from '../Images/report.png'
import Product from '../Components/Product'
import product1 from '../Images/product 1.png'
import product2 from '../Images/product 2.png'
import ProductContext from '../ProductContext';
import UserContext from '../UserContext'
import { useState, useEffect, useContext } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";

const ProductDetails = () => {
  /*
  const product_id = 1234567890987
  const product_name = 'Mackbook Pro'
  const product_short_description = 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage'
  const product_price = '12 000 MAD'
  const bid = '12 050 MAD'
  const product_long_description = 'Lorem ipsum dolor sit amet, consectetur adipiscing ipsum dolor sit amet,' +
  'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad' +
  'minim veniam, quis nostrud exercitation ullamco ipsum dolor sit amet, consectetur adipiscing elit, sed do ' +
  'eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercita' +
  'tion ullamco'
  const product_owner = 'John Doe'
  const similar_products = [
    {
    id: 1,
    name : 'Mackbook Pro', 
    description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
    price: '12 000 MAD',
    enddate: '2023-12-31T23:59:59Z',
    image: product1,
    },

    {
    id: 2,
    name : 'Nike React Miler', 
    description: 'Men’s Road Running shoes', 
    price: '3 255 MAD',
    enddate: '2023-12-29T10:00:59Z',
    image: product2,
    },

    {
    id: 3,
    name : 'Mackbook Pro', 
    description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
    price: '12 000 MAD',
    enddate: '2024-01-31T20:59:59Z',
    image: product1,
    },

    {
    id: 4,
    name : 'Nike React Miler', 
    description: 'Men’s Road Running shoes', 
    price: '3 255 MAD',
    enddate: '2023-12-28T23:59:59Z',
    image: product2,
    },

    {
    id: 5,
    name : 'Mackbook Pro', 
    description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
    price: '12 000 MAD',
    enddate: '2023-12-31T01:59:59Z',
    image: product1,
    },

    {
    id: 6,
    name : 'Nike React Miler', 
    description: 'Men’s Road Running shoes', 
    price: '3 255 MAD',
    enddate: '2023-12-31T11:59:59Z',
    image: product2,
    },

    {
    id: 7,
    name : 'Mackbook Pro', 
    description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
    price: '12 000 MAD',
    enddate: '2023-12-30T23:59:59Z',
    image: product1,
    },
]; 
*/
  const { username } = useContext(UserContext);
  const { selectedProduct } = useContext(ProductContext);
  const product_img = selectedProduct.image
  const product_id = selectedProduct.id
  const product_name = selectedProduct.name
  const product_short_description = selectedProduct.description
  const product_price = selectedProduct.price
  const [bid, setBid] = useState((Number(product_price) + 50).toString());
  const product_long_description = selectedProduct.longdescription
  const product_owner = selectedProduct.owner
  const product_top_bidder = selectedProduct.topbidder

  const [similarProducts, setSimilarProducts] = useState([]);

    const fetchData = async () => {
        const collectionRef = collection(db, "itemdetails");

        try {
        const snapshot = await getDocs(collectionRef);
        const productsData = [];

        for (const doc of snapshot.docs) {
            const data = doc.data();
            const imageRef = ref(storage, data.imageUrl);

            try {
            const imageUrl = await getDownloadURL(imageRef);

            console.log(data);
            productsData.push({
                id: doc.id,
                name: data.itemName,
                description: data.itemShortDescription,
                longdescription: data.itemDescription,
                price: data.TOPBID,
                enddate: data.endDate,
                image: imageUrl,
                owner: data.ItemOwner,
            });
            } catch (error) {
            console.error(
                `Error getting download URL for image: ${data.imageUrl}`,
                error
            );
            }
        }

        setSimilarProducts(productsData);
        } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

  const handleUpBid = () => {
    setBid((Number(bid) + 1).toString())
  }

  const handleDownBid = () => {
    if( (Number(bid) - 1) > Number(product_price)) { setBid((Number(bid) - 1).toString()) }
  }

  const handleBidClick = async () => {
    const productDocRef = doc(db, 'itemdetails', product_id)
    try{
      await updateDoc(productDocRef, {
        TOPBID: bid,
        TopBidder: username
      })
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='product-details'>
      <Link to='/BidWise/' className='go-back-div'>
          <img src={back} alt='go-back' id='back-img'/>
          <p>Go Back</p>
      </Link>

      <h1 id='product-details-h1'>Product Details</h1>

      <div className='product-details-container'>
        <img src={product_img} alt='product-image' id='product-details-img'/>

        <div className='product-details-info'>
          <p id='product-id'>{"ID: " + product_id}</p>
          <p id='product-name'>{product_name}</p>
          <p id='product-short-description'>{product_short_description}</p>

          <div className='other-btns'>
            <button id='add-to-fav-btn'>
              <img src={heart} alt='heart' id='heart-img'/>
              <p>Add to Favorites</p>
            </button>
            <button id='share-btn'>
              <img src={share} alt='share' id='share-img'/>
              <p>Share</p>
            </button>
            <button id='report-btn'>
              <img src={report} alt='report' id='report-img'/>
              <p>Report</p>
            </button>
          </div>

          <div className='product-details-price'>
            <p id='product-actual-bid'>{"Actual Bid: " + product_price}</p>

            <div className='bid-slider-btn'>
              <div className='bid-displayer'>{bid}</div>
              <div className='bid-slider'>
                <div className='up' onClick={handleUpBid}>
                  <img src={up} alt='up' id='up-img'/>
                </div>
                <div className='down' onClick={handleDownBid}>
                  <img src={down} alt='down' id='down-img'/>
                </div>
              </div>
          </div>

          <div className='bid-btn-div'>
          {username === '' ?
            <Link to='/BidWise/Login'>
              <button id='bid-btn-disabled'>Bid</button>
            </Link>
            :
            <Link to='/BidWise/Payment' onClick={handleBidClick}>
              <button id='bid-btn'>Bid</button>
            </Link>
          }
          </div>
          
        </div>

        </div>
      </div>

      <div className='product-details-long-description'>
        <h2 id='long-description-header'>Detailed Description</h2>
        <p id='long-description-text'>{product_long_description}</p>
      </div>

      <p id='product-owner'>{'Owner: ' + product_owner}</p>

      <p id='product-owner'>{product_top_bidder === "" ? 'Top Bidder: No one' : 'Top Bidder: ' + product_top_bidder}</p>

      <div className='similar-bids'>
          <h2 id='similar-bids-headline'>Similar Bids</h2>
          <div className='similar-bids-container'>
            {similarProducts.map((product, index) => (
                  <Product key={index} product={product} />
            ))}
          </div>
      </div>

    </div>
  )
}

export default ProductDetails

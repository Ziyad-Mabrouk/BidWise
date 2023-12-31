import React from "react";
import { Link } from "react-router-dom";
import "../Styles/ProductDetails.css";
import back from "../Images/back.png";
//import product_img from '../Images/product 1.png'
import up from "../Images/up.png";
import down from "../Images/down.png";
import heart from "../Images/heart.png";
import share from "../Images/share.png";
import report from "../Images/report.png";
import Product from "../Components/Product";
import product1 from "../Images/product 1.png";
import product2 from "../Images/product 2.png";
import ProductContext from "../ProductContext";
import UserContext from "../UserContext";
import { useState, useEffect, useContext } from "react";
import { db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import { query, where } from "firebase/firestore";

const ProductDetails = () => {
  const [soldee, setSoldee] = useState("");
  const { setSolde } = useContext(UserContext);
  const { username } = useContext(UserContext);
  const { selectedProduct } = useContext(ProductContext);
  const product_img = selectedProduct.image;
  const product_id = selectedProduct.id;
  const product_name = selectedProduct.name;
  const product_short_description = selectedProduct.description;
  const product_price = selectedProduct.price;
  const [bid, setBid] = useState((Number(product_price) + 50).toString());
  const product_long_description = selectedProduct.longdescription;
  const product_owner = selectedProduct.owner;
  const product_top_bidder = selectedProduct.topbidder;
  const product_top_bid = Number(selectedProduct.topbid);

  const [similarProducts, setSimilarProducts] = useState([]);

  const fetchData = async () => {
    const collectionRef = collection(db, "itemdetails");

    const collectionRef2 = collection(db, "users");

    try {
      const snapshot = await getDocs(collectionRef);
      const snapshot2 = await getDocs(collectionRef2);

      const productsData = [];
      //search for username and its solde
      for (const doc of snapshot2.docs) {
        const data2 = doc.data();
        console.log(data2.name);
        if (data2.name == username) {
          console.log(data2.Solde, "solde page");
          setSoldee(data2.Solde);
        }
      }

      //get details
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
    setBid((Number(bid) + 1).toString());
  };

  const handleDownBid = () => {
    if (Number(bid) - 1 > Number(product_price)) {
      setBid((Number(bid) - 1).toString());
    }
  };

  const handleBidClick = async () => {
    const productDocRef = doc(db, "itemdetails", product_id);
    const usersCollectionRef = collection(db, "users");
    let userDocRef; // Declare userDocRef here

    try {
      // start give money back to extobidder
      const querySnapshot0 = await getDocs(
        query(usersCollectionRef, where("name", "==", product_top_bidder))
      );
      if (!querySnapshot0.empty) {
        userDocRef = querySnapshot0.docs[0].ref;
        let exsolde = querySnapshot0.docs[0].data().Solde;

        await updateDoc(userDocRef, {
          Solde: exsolde + product_top_bid,
        });
        alert(
          "Money: " +
            product_top_bid +
            " has been given to the previous top bidder: " +
            product_top_bidder
        );
      }
      // end give money back to ex-topbidder

      // start update new bidder solde and make him topbidder
      const querySnapshot = await getDocs(
        query(usersCollectionRef, where("name", "==", username))
      );
      if (!querySnapshot.empty) {
        userDocRef = querySnapshot.docs[0].ref;
      }

      await updateDoc(productDocRef, {
        TOPBID: bid,
        TopBidder: username,
      });

      let a = soldee - bid;
      setSolde(a);

      if (a < 0) {
        alert("Not enough money, you can't bid...Charge your card");
      } else {
        // If there's enough money, update the document
        await updateDoc(userDocRef, {
          Solde: a,
        });

        alert("Your current solde is: " + a);
      }
      // end update new bidder solde and make him topbidder
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="product-details">
      <Link to="/BidWise/" className="go-back-div">
        <img src={back} alt="go-back" id="back-img" />
        <p>Go Back</p>
      </Link>

      <h1 id="product-details-h1">Product Details</h1>

      <div className="product-details-container">
        <img src={product_img} alt="product-image" id="product-details-img" />

        <div className="product-details-info">
          <p id="product-id">{"ID: " + product_id}</p>
          <p id="product-name">{product_name}</p>
          <p id="product-short-description">{product_short_description}</p>

          <div className="other-btns">
            <button id="add-to-fav-btn">
              <img src={heart} alt="heart" id="heart-img" />
              <p>Add to Favorites</p>
            </button>
            <button id="share-btn">
              <img src={share} alt="share" id="share-img" />
              <p>Share</p>
            </button>
            <button id="report-btn">
              <img src={report} alt="report" id="report-img" />
              <p>Report</p>
            </button>
          </div>

          <div className="product-details-price">
            <p id="product-actual-bid">{"Actual Bid: " + product_price + " MAD"}</p>

            <div className="bid-slider-btn">
              <div className="bid-displayer">{bid}</div>
              <div className="bid-slider">
                <div className="up" onClick={handleUpBid}>
                  <img src={up} alt="up" id="up-img" />
                </div>
                <div className="down" onClick={handleDownBid}>
                  <img src={down} alt="down" id="down-img" />
                </div>
              </div>
            </div>

            <div className="bid-btn-div">
              {username === "" ? (
                <Link to="/BidWise/Login">
                  <button id="bid-btn-disabled">Bid</button>
                </Link>
              ) : (
                <Link to="/BidWise/Payment" onClick={handleBidClick}>
                  <button id="bid-btn">Bid</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="product-details-long-description">
        <h2 id="long-description-header">Detailed Description</h2>
        <p id="long-description-text">{product_long_description}</p>
      </div>

      <p id="product-owner">{"Owner: " + product_owner}</p>

      <p id="product-owner">
        {product_top_bidder === ""
          ? "Top Bidder: No one"
          : "Top Bidder: " + product_top_bidder}
      </p>

      <div className="similar-bids">
        <h2 id="similar-bids-headline">Similar Bids</h2>
        <div className="similar-bids-container">
          {similarProducts.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

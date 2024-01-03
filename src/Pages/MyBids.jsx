import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import Product from "../Components/Product";
import LostBid from "../Components/LostBid";

import "../Styles/MyBids.css";
import empty from "../Images/empty.png";

const MyBids = () => {
  const { username } = useContext(UserContext);
  const { Solde } = useContext(UserContext);
  const [productList, setProductList] = useState([]);
  const [lostBidsList, setLostBidsList] = useState([]);

  const fetchLostBids = async () => {
    const collectionRef = collection(db, "itemdetails");
    try {
      const snapshot = await getDocs(collectionRef);
      const lostBids = [];

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const imageRef = ref(storage, data.imageUrl);

        try {
          const imageUrl = await getDownloadURL(imageRef);

          // Filter items where product.topbidder === username
          if (data.lostBidders.includes(username)) {
            lostBids.push({
              name: data.itemName,
              description: data.itemShortDescription,
              price: data.TOPBID,
              enddate: data.endDate,
              image: imageUrl,
              owner: data.ItemOwner,
              topbidder: data.TopBidder,
            });
          }
        } catch (error) {
          console.error(
            `Error getting download URL for image: ${data.imageUrl}`,
            error
          );
        }
      }

      setLostBidsList(lostBids);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
  };


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

          // Filter items where product.topbidder === username
          if (data.TopBidder === username) {
            productsData.push({
              name: data.itemName,
              description: data.itemShortDescription,
              price: data.TOPBID,
              enddate: data.endDate,
              image: imageUrl,
              owner: data.ItemOwner,
              topbid: data.TOPBID,
            });
          }
        } catch (error) {
          console.error(
            `Error getting download URL for image: ${data.imageUrl}`,
            error
          );
        }
      }

      setProductList(productsData);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchLostBids();
  }, []);

  console.log(Solde, "solde");
  return (
    <div className="my-items">
      <h1 id="myitems-headline">My bids</h1>
      <h2 id="solde">My current Solde : {Solde} MAD</h2>

      <h1 id="mybids-subheadline">Wining bids</h1>

      <div className="my-items-container">
        {productList.map((product, index) => (
          <Product key={index} product={product} />
        ))}
        {productList.length === 0 && (
          <div className="empty">
            <div className="empty-img-div">
              <img src={empty} alt="no published items" id="empty-img" />
              <p className="empty-text">
                You're not the top bidder in any bids.
              </p>
            </div>
            <div className="add-btn-div">
              <p>Participate in an auction now:</p>
              <Link to="/BidWise/">
                <button id="add-item-btn">Bid</button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <h1 id="lostbids-subheadline">Lost bids</h1>

      <div className="my-items-container">
        {lostBidsList.map((product, index) => (
          <LostBid key={index} product={product} />
        ))}
        {productList.length === 0 && (
          <p>You have no lost bids.</p>
        )}
      </div>
    </div>
  );
};

export default MyBids;

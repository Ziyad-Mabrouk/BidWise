import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import Product from "../Components/Product";

import "../Styles/MyItems.css";
import empty from "../Images/empty.png";

const MyBids = () => {
  const { username } = useContext(UserContext);
  const { Solde } = useContext(UserContext);
  const [productList, setProductList] = useState([]);

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
  }, []);
  console.log(Solde, "solde");
  return (
    <div className="my-items">
      <h1 id="myitems-headline">My winning bids</h1>
      <h2 id="solde">My current Solde : {Solde} MAD</h2>

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
    </div>
  );
};

export default MyBids;

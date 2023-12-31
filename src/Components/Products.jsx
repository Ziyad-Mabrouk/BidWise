import react from "react";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import Product from "./Product";
import product1 from "../Images/product 1.png";
import product2 from "../Images/product 2.png";

import "../Styles/Products.css";

const Products = () => {
  const [productList2, setProductList2] = useState([]);

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
            topbidder: data.TopBidder,
            enddate: data.endDate,
            image: imageUrl,
            owner: data.ItemOwner,
            topbid: data.TOPBID,
          });
        } catch (error) {
          console.error(
            `Error getting download URL for image: ${data.imageUrl}`,
            error
          );
        }
      }

      setProductList2(productsData);
    } catch (error) {
      console.error("Error fetching data from Firestore: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products">
      {productList2.map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
};

export default Products;

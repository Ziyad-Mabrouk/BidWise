import react from "react";
import { useState, useEffect } from "react";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import Product from "./Product";
import product1 from "../Images/product 1.png";
import product2 from "../Images/product 2.png";

import "../Styles/Products.css";

const productList = [
  {
    id: 1,
    name: "Mackbook Pro",
    description: "Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage",
    price: "12 000 MAD",
    enddate: "2023-12-31T23:59:59Z",
    image: product1,
  },

  {
    id: 2,
    name: "Nike React Miler",
    description: "Men’s Road Running shoes",
    price: "3 255 MAD",
    enddate: "2023-12-29T10:00:59Z",
    image: product2,
  },

  {
    id: 3,
    name: "Mackbook Pro",
    description: "Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage",
    price: "12 000 MAD",
    enddate: "2024-01-31T20:59:59Z",
    image: product1,
  },

  {
    id: 4,
    name: "Nike React Miler",
    description: "Men’s Road Running shoes",
    price: "3 255 MAD",
    enddate: "2023-12-28T23:59:59Z",
    image: product2,
  },

  {
    id: 5,
    name: "Mackbook Pro",
    description: "Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage",
    price: "12 000 MAD",
    enddate: "2023-12-31T01:59:59Z",
    image: product1,
  },

  {
    id: 6,
    name: "Nike React Miler",
    description: "Men’s Road Running shoes",
    price: "3 255 MAD",
    enddate: "2023-12-31T11:59:59Z",
    image: product2,
  },

  {
    id: 7,
    name: "Mackbook Pro",
    description: "Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage",
    price: "12 000 MAD",
    enddate: "2023-12-30T23:59:59Z",
    image: product1,
  },
];

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

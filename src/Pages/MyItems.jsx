import { useState, useEffect, useContext } from "react";
import UserContext from "../UserContext";
import { Link } from "react-router-dom";
import { auth, db, storage } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";
import { ref, getDownloadURL } from "@firebase/storage";
import MyItem from '../Components/MyItem';

import '../Styles/MyItems.css';
import empty from '../Images/empty.png';

const MyItems = () => {
    const { username } = useContext(UserContext);
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

            // Filter items where product.owner === username
            if (data.ItemOwner === username) {
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

    return (
        <div className='my-items'>
            <h1 id="myitems-headline">My published bids</h1>
            <div children='my-items-container'>
                {productList.map((product, index) => (
                    <MyItem key={index} product={product} />
                ))}
                {productList.length === 0 && (
                    <div className="empty">
                        <div className='empty-img-div'>
                            <img src={empty} alt='no published items' id='empty-img'/>
                            <p className="empty-text">No items published yet.</p>
                        </div>
                        <div className='add-btn-div'>
                            <p>Publish your first bid:</p>
                            <Link to='/BidWise/Sell/'><button id='add-item-btn'>Add Item</button></Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyItems;
import react from 'react';
import Product from './Product';
import product1 from '../Images/product 1.png';
import product2 from '../Images/product 2.png';

import '../Styles/Products.css';

const productList = [
                        {
                        name : 'Mackbook Pro', 
                        description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
                        price: '12 000 MAD',
                        time: '02:30:00',
                        image: product1,
                        },

                        {
                        name : 'Nike React Miler', 
                        description: 'Men’s Road Running shoes', 
                        price: '3 255 MAD',
                        time: '15:20:10',
                        image: product2,
                        },

                        {
                        name : 'Mackbook Pro', 
                        description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
                        price: '12 000 MAD',
                        time: '02:30:00',
                        image: product1,
                        },

                        {
                        name : 'Nike React Miler', 
                        description: 'Men’s Road Running shoes', 
                        price: '3 255 MAD',
                        time: '15:20:10',
                        image: product2,
                        },

                        {
                        name : 'Mackbook Pro', 
                        description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
                        price: '12 000 MAD',
                        time: '02:30:00',
                        image: product1,
                        },

                        {
                        name : 'Nike React Miler', 
                        description: 'Men’s Road Running shoes', 
                        price: '3 255 MAD',
                        time: '15:20:10',
                        image: product2,
                        },

                        {
                        name : 'Mackbook Pro', 
                        description: 'Apple M1 Chip with 8‑Core CPU and 8‑Core GPU 512GB Storage', 
                        price: '12 000 MAD',
                        time: '02:30:00',                            image: product1,
                        },
                    ];  

const Products = () => {
    return (
        <div className='products'>
            {productList.map((product) => {
                return <Product product={product}/>
            })}
        </div>
    )
}

export default Products;
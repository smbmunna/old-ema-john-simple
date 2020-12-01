import React, { useState, useEffect } from 'react';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10products= fakeData.slice(0,10);
    const [products, setProducts]= useState(first10products);
    const [cart, setCart]=useState([]);

    useEffect(()=>{
        const savedCart= getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        const previousCart= productKeys.map(key=>{
            const product= fakeData.find(allProduct=>allProduct.key===key);
            product.quantity= savedCart[key];
            return product;
        })
        setCart(previousCart);
    },[]);

    const handleAddProduct= (product)=>{     
        const toBeAddedKey= product.key;
        let count=1;
        let newCart;
        const matchedProducts= cart.find(pd=>pd.key===toBeAddedKey);
        if(matchedProducts){
            count= matchedProducts.quantity+1;
            matchedProducts.quantity= count;
            const otherProducts= cart.filter(pd=>pd.key!==toBeAddedKey);
            newCart=[...otherProducts,matchedProducts];
        }else{
            product.quantity=1;
            newCart=[...cart,product];
        }
        setCart(newCart);       
        addToDatabaseCart(product.key, count);
    }
    return (
        <div className='parallel-container'> 
            <div className="product-container">           
                {products.map(pd=>
                <Product 
                    showAddToCartBtn={true} 
                    product={pd} 
                    handleAddProduct={handleAddProduct}
                    key={pd.key}>                        
                </Product>)}                
            </div>
            <div className="cart-container">
                <Cart cart={cart} >
                    <Link to='/review'>
                        <button className='main-button'>Review Order</button>
                    </Link>    
                </Cart>                
            </div>            
        </div>
    );
};

export default Shop;
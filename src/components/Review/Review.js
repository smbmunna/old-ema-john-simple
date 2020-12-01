import React from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import { useState,useEffect } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';


const Review = () => {
    const [cart, setCart]= useState([]);
    const [orderPlaced, setOrderPlace]= useState(false);
    const history= useHistory();
    const handleProceedCheckout=()=>{
        history.push('/shipment');
    }

    const removeItem=(productKey)=>{
        const newCart= cart.filter(pd=>pd.key !== productKey); // removing clicked item from cart
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };
    
    useEffect(()=>{
        const savedCart=getDatabaseCart();
        const productKeys= Object.keys(savedCart);
        const cartProducts= productKeys.map(key=>{
            const product= fakeData.find(pd=>pd.key===key);
            product.quantity=savedCart[key];
            return product;
        })
        setCart(cartProducts);
    },[]);

    let orderPlaceSuccessImage;
    if(orderPlaced){
        orderPlaceSuccessImage=<img src={happyImage} alt=''/>;
    };

    
    return (
        <div className="parallel-container">           
            <div className="product-container">
                {cart.map(pd=><ReviewItem 
                    product={pd} 
                    key={pd.key}
                    removeItem={removeItem}
                    >                                    
                </ReviewItem>)}                
            {orderPlaceSuccessImage}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='main-button'>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
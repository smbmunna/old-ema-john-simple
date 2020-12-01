import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    //console.log(props);
    const {img,name,seller,price,stock,key}=props.product; //javascript object destructuring

    return (
        <div className='product'>
            <div>
                <img src={img} alt='' />
            </div>
            <div className='product-details'>
                <h4 className='product-name'><Link to={"/product/"+key}>{name}</Link></h4>
                <br />
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCartBtn===true && <button className='main-button' onClick={()=>props.handleAddProduct(props.product)}> 
                    <FontAwesomeIcon icon={faShoppingCart} /> 
                    Add to cart
                </button>}

            </div>

        </div>
    );
};

export default Product;
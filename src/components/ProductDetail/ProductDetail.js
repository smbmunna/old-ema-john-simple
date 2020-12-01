import React from 'react';
import Product from '../Product/Product';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';


const ProductDetail = () => {
    const {productKey}=useParams();    
    const product= fakeData.find(pd=>pd.key===productKey);
    
    return (
        <div>
            <h1>{productKey} Product detail is coming soon </h1>
            <Product showAddToCartBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
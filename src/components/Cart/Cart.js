import React from 'react';


const Cart = (props) => {
    const cart=props.cart;   
    let totalPrice=0;    
    for(let i=0; i<cart.length; i++){
        let product= cart[i];       
        totalPrice=totalPrice+product.price*product.quantity;
    }
    let shipping=0;
    if(totalPrice>35){
        shipping=0;
    }else if(totalPrice>15){
        shipping=4.99;
    }else if(totalPrice>0){
        shipping=12.99;
    }

    const tax=totalPrice/10;
    const grandTotal= totalPrice+shipping+tax;
    const formatNumber= (num)=>{
        let precision= num.toFixed(2);
        return Number( precision);
    }
    
    return (
        <div>
            <h5>Items Ordered:{cart.length}</h5>
            <h5>Product Price:{formatNumber(totalPrice)} </h5>                        
            <h5>Shipping Cost:{formatNumber(shipping)} </h5>
            <h5>Tax/VAT: {formatNumber(tax)}</h5>
            <h5>Total Cost:{formatNumber(grandTotal)} </h5>
            {
                props.children
            }
        </div>
    );
};

export default Cart;
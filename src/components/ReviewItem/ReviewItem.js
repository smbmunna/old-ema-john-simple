import React from 'react';

const ReviewItem = (props) => {
    const{name,quantity,key}=props.product;
    const reviewItemStyle={
        borderBottom: "1px solid grey",
        borderLeft: "1px solid grey",
        marginBotton: "5px",
        marginLeft: "200px",
        padding: "5px",

    };
    return (
        <div style={reviewItemStyle}>
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>Price: ${props.product.price}</p>
            <br/>
            <button className="main-button" onClick={()=>props.removeItem(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;
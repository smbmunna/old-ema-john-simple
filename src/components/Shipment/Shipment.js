import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { useContext } from 'react';
import {userContext} from '../../App';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser]=useContext(userContext);
    const onSubmit = data => console.log(data);
    console.log(loggedInUser);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>     

      <input name="name" ref={register({ required: true })} defaultValue={loggedInUser.displayName} placeholder="Your Name" />
      {errors.name && <span className='error'>Name is required</span>}

      <input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
      {errors.email && <span className='error'>Email is required</span>}

      <input name="address" ref={register({ required: true })} placeholder="Your Address"  />
      {errors.address && <span className='error'>Address is required</span>}

      <input name="phone" ref={register({ required: true })} placeholder="Your Phone No."  />
      {errors.phone && <span className='error'>Phone is required</span>}
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;
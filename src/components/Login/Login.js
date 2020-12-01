import React, { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSingIn, handleSignOut,handleFbSignIn, createUserWithEmailAndPassword, singInWithEmailAndPassword } from './LoginManager';



function Login() {  
  
  const [newUser, setNewUser]= useState(false);
  const [user,setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    password: '',
    photo:'',
    error:'',
    success:''
  });

  initializeLoginFramework();       //Initializint firebase 

  const [loggedInUser, setLoggedInUser]= useContext(userContext);
  //Ridirecting after successful login
  const history= useHistory();
  const location= useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
 

  const handleSubmit= (e)=>{
    
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res=>{
        handleResponse(res,true);
      })
    }e.preventDefault();
    
    if(!newUser && user.email && user.password){
      singInWithEmailAndPassword(user.email, user.password)    
      .then(res=>{
        handleResponse(res,true);
      })  
    }
  
  }
  
  const handleChange= (event)=>{
    let isFieldValid=true;
    if(event.target.name==='email'){
      isFieldValid= /\S+@\S+\.\S+/.test(event.target.value);      
    }if(event.target.name==='password'){
      const isPasswordValid= event.target.value.length> 6;
      const passwordHasNumber= /\d{1}/.test(event.target.value);
      isFieldValid= isPasswordValid && passwordHasNumber;
    }
    if(isFieldValid){
      const newUser= {...user};
      newUser[event.target.name]= event.target.value;
      setUser(newUser);      
    }
  }

  const googleSingIn = ()=>{
    handleGoogleSingIn()
    .then(res=>{
      handleResponse(res,true);
    });
  }
   const handleFbSignIn=()=>{
    handleFbSignIn()
    .then(res=>{
      handleResponse(res,true);
    })
   }

  const signOut= ()=>{
    handleSignOut()
    .then(res=>{
      handleResponse(res,false);
    })
  }

  const handleResponse = (res, redirect)=>{
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);//For redirecting after successful login
    }
  }



  return (
    <div style={{textAlign: 'center'}}>
        {
          user.isSignedIn ?
          <button onClick={signOut}>Sign Out</button>
          :
          <button onClick={googleSingIn}>Sign in </button>
        }<br/>
        <button onClick={handleFbSignIn}>Sign in with Facebook</button>
        {
        user.isSignedIn && 
          <div>
             <h3>Welcome back {user.name}</h3>
             <img src={user.photo} alt=''></img>
          </div>
        }
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>

        <form onSubmit={handleSubmit}>
          <input type="checkbox" name="newUser" onChange={()=>setNewUser(!newUser)}/>
          <label htmlFor="newUser">Sign Up for New User</label> <br/>
          {newUser && <input type="text" name="name" placeholder="Enter your name" onBlur={handleChange} />}
          <br/>
          <input type="text" name="email" id="" onBlur={handleChange} placeholder="Enter your email" required/>
          <br/>
          <input type="password" name="password" id="" onBlur={handleChange} placeholder="Enter your password" required />
          <br/>
          <input type="submit" value="Submit"/>
          <br/>
          <p style={{color:'red'}}>{user.error}</p>
          <p style={{color:'green'}}>{user.success}</p>
        </form>
    </div>
  );
}

export default Login; 
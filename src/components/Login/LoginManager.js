import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase-config';


export const initializeLoginFramework= ()=>{
    if(firebase.apps.length===0){
      firebase.initializeApp(firebaseConfig);
    }
}


export const handleGoogleSingIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();// Google provider
    return firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, photoURL, email}=res.user;
      console.log(displayName, photoURL, email);
      const signedInUser= {
        isSignedIn:true,
        name:displayName,
        email:email,
        photo:photoURL
      };
      return signedInUser;
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    });
  }


  export const handleFbSignIn=()=>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      return user;
      //console.log('After sign in fb User', user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  export const handleSignOut= ()=>{
    return firebase.auth().signOut()
    .then(res =>{
      const signedOutUser= {
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      return signedOutUser;
    })
    .catch(err =>{
      console.log(err.message);
    })
  }

  export const createUserWithEmailAndPassword = (name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res=>{
      const newUserInfo= {res};
      newUserInfo['success']='User Created Successfully';
      newUserInfo['error']='';
      updateUserName(name);//Updating display name using firebase
      return newUserInfo;
    })
    .catch(error =>{        
      const newUserInfo= {};
      newUserInfo['error']=error.message;
      newUserInfo['success']='';
      return newUserInfo; 
    });
  }


  export const singInWithEmailAndPassword= (email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo= res.user;
      newUserInfo['success']='User Logged in Successfully';
      newUserInfo['error']='';
      return newUserInfo;
    })
    .catch(error=> {
      const newUserInfo= {};
      newUserInfo['error']=error.message;
      newUserInfo['success']='';
      return newUserInfo;
    });
  }

  const updateUserName= name=>{

    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error);
    });
  }

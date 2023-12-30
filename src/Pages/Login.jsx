import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import google_logo from '../Images/google_logo.png';
import { auth, db } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import UserContext from "../UserContext";

function Login() {
    //init call to database users from firebase
    const userCollectionRef = collection(db, "users");
  
    //input fields init
    const { setUsername } = useContext(UserContext);
    const [Newemail, setEmail] = useState("");
    const [Newpassword, setPassword] = useState("");
    const navigate = useNavigate();

    //fcts to handle input changes
    const onEmailChange = (event) => {
      setEmail(event.target.value);
    };
  
    const onPasswordChange = (event) => {
      setPassword(event.target.value);
    };

    //get username by taking the email
    const getUserData = async (email) => {
      try {
        const q = query(userCollectionRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const name = userData.name;
  
          setUsername(name);
          console.log("User name:", name);
        } else {
          console.log("No user found with the email:", email);
        }
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };


    //get the user data to check if the login credentiels are correct
    const onHandleLogin = async () => {
      try {
        await signInWithEmailAndPassword(auth, Newemail, Newpassword);
        alert("Login successful");
        getUserData(Newemail); // Fetch user data after successful login and pass it yo getUserData to get the username
        navigate('/BidWise/');
      } catch (error) {
        alert("Wrong credentials, try again");
      }
    };

    return (
        <div className="login">
            <h1 className="login-headline">Login</h1>
            
            <div className="login-box">
                <p className="login-subheadline">Enter your Email and Password to Sign in</p>
                
                <input type="email" className="input-field" placeholder="Email" onChange={onEmailChange}/>
                <input type="password" className="input-field" placeholder="Password" onChange={onPasswordChange}/>

                <div className="checkbox-div">
                    <label id="checkbox-label">
                        <input type="checkbox" className="checkbox"/>
                        <span>Remember Me</span>
                    </label>
                    <Link className="login-link">Forgot password?</Link>
                </div>

                <button id="login-btn" onClick={onHandleLogin}>Login</button>

                <p className="login-small-text">
                Don't have an account yet? <Link to="/BidWise/SignUp/" className="login-link" id="register-now-link">Register now</Link>
                </p>

                <div className="or-div">
                    <hr/>
                    <h1 id="or-text">Or</h1>
                    <hr/>
                </div>

                <button id="google-btn">
                <img src={google_logo} alt="google" id="google-logo"/>
                <span id="google-btn-text">Sign Up With Google</span>
                </button>

            </div>

        </div>
  );
};

export default Login;

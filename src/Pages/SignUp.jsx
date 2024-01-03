import React from "react";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";
import google_logo from '../Images/google_logo.png';
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function SignUp() {
  //const { setUsername } = useContext(UserContext);

  //champs signup
  const [Newemail, setEmail] = useState("");
  const [Newpassword, setPassword] = useState("");
  const [Newname, setName] = useState("");
  const [Newnbr, setNbr] = useState("");

  //pour naviguer le site
  const navigate = useNavigate();

  //call the database users from firebase
  const usersCollectionRef = collection(db, "users");

  //fcts to take changes from inputs
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const onNbrChange = (event) => {
    setNbr(event.target.value);
  };

  //fct to handle register
  const onHandleRegister = async () => {
    try {
      if (!Newname || !Newemail || !Newpassword || !Newnbr) {
        //check if all fields are filled
        alert("Please fill in all required fields.");
        return;
      }

      //zid email & password f auth
      await createUserWithEmailAndPassword(auth, Newemail, Newpassword);

      //zid user
      await addDoc(usersCollectionRef, {
        Solde: 40000,
        name: Newname,
        email: Newemail,
        password: Newpassword,
        phone_number: Newnbr,
      });

      alert("Registration successful!");
      //setUsername(Newname);
      navigate('/BidWise/Login/'); //navigate to home
    } catch (error) {
      console.error("Registration unsuccessful", error);
      alert("Registration unsuccessful. Please try again.");
    }
  };
  return (
    <div className="signup">
      <h1 className="signup-headline">Create An Account</h1>
      <div className="signup-box">
            <p className="signup-subheadline">Fill in the required informations to create your account</p>

            <input type="text" className="input-field" placeholder="Name" id="name" onChange={onNameChange}/>
            <input type="tel" className="input-field" placeholder="Phone Number" onChange={onNbrChange}/>
            <input type="email" className="input-field" placeholder="Email" onChange={onEmailChange}/>
            <input type="password" className="input-field" placeholder="Password" onChange={onPasswordChange}/>
            <input type="password" className="input-field" placeholder="Confirm Password"/>

            <div className="checkboxs">
                <label id="checkbox-label">
                    <input type="checkbox" className="checkbox"/>
                    <p className="checkbox-text">Notify me about new features and special offers</p>
                </label>

                <label id="checkbox-label">
                    <input type="checkbox" className="checkbox"/>
                    <p className="checkbox-text">I agree to the Terms of Service, General Terms and Conditions and Privacy Policy.</p>
                </label>    
            </div>
            

            <button id="signup-btn" onClick={onHandleRegister}>Sign Up</button>

            <p className="signup-small-text">
            Already have an account? <Link to="/BidWise/Login/" className="signup-link" id="login-link">Login</Link>
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
}
export default SignUp;

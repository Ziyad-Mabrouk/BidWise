import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Sell from "./Pages/Sell";
import AboutUs from "./Pages/AboutUs";
import Payment from "./Pages/Payment";
import MyItems from "./Pages/MyItems";
import MyBids from "./Pages/MyBids";
import Footer from "./Components/Footer";
import ScrollToTop from "./ScrollToTop";
import ProductDetails from "./Pages/ProductDetails";
import UserContext from "./UserContext";
import ProductContext from "./ProductContext";
import HumanVerification from "./Pages/HumanVerification";

const App = () => {
  const [username, setUsername] = useState(""); //use usestate and usercontext to pass the username between elements
  const [Solde, setSolde] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); //use usestate and productcontext to pass the selected product between elements

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <UserContext.Provider
          value={{ username, setUsername, Solde, setSolde }}
        >
          <ProductContext.Provider
            value={{ selectedProduct, setSelectedProduct }}
          >
            <Navbar />
            <Routes>
              <Route path="/BidWise/" element={<Home />} />
              <Route path="/BidWise/Login/" element={<Login />} />
              <Route path="/BidWise/SignUp/" element={<SignUp />} />
              <Route path="/BidWise/Sell/" element={<Sell />} />
              <Route path="/BidWise/AboutUs/" element={<AboutUs />} />
              <Route path="/BidWise/Payment/" element={<Payment />} />
              <Route path="/BidWise/MyItems/" element={<MyItems />} />
              <Route path="/BidWise/MyBids/" element={<MyBids />} />
              <Route
                path="/BidWise/HumanVerification/"
                element={<HumanVerification />}
              />
              <Route
                path="/BidWise/ProductDetails/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </ProductContext.Provider>
        </UserContext.Provider>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

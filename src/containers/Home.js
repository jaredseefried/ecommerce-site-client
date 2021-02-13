import React from "react";
import "./Home.css";
import shoppingCartIcon from '../images/shopping-cart.jpg'

export default function Home() {
  return (
    <div className="Home">
      <div className="lander">
        <img src={shoppingCartIcon} className="shopping-cart-icon" />
        <h1>E-Commerce Site</h1>
        <p className="text-muted">A place to sell something</p>
      </div>
    </div>
  );
}
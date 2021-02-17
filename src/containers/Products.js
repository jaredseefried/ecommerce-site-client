import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Products.css";
import shoppingCartIcon from '../images/shopping-cart.jpg'
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }
  
      try {
        const products = await loadProducts();
        setProducts(products);
      } catch (e) {
        onError(e);
      }
  
      setIsLoading(false);
    }
  
    onLoad();
  }, [isAuthenticated]);
  
  function loadProducts() {
    return API.get("products", "/products");
  }

  function renderProductsList(products) {
    return (
      <>
        <LinkContainer to="/products/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Create a new product</span>
          </ListGroup.Item>
        </LinkContainer>
        {products.map(({ productId, content, createdAt }) => (
          <LinkContainer key={productId} to={`/products/${productId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Created: {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <img src={shoppingCartIcon} className="shopping-cart-icon" />
        <h1>E-Commerce Store</h1>
        <p className="text-muted">A place to sell something</p>
      </div>
    );
  }

  function renderProducts() {
    return (
      <div className="products">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Products</h2>
        <ListGroup>{!isLoading && renderProductsList(products)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Products">
      {isAuthenticated ? renderProducts() : renderLander()}
    </div>
  );
}
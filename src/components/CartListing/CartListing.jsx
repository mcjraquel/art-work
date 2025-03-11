import React from "react";
import { MdDelete } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { HiCurrencyDollar } from "react-icons/hi";
import "./CartListing.css";

import { useUserData } from "../../contexts/UserDataProvider.js";

export const CartListing = () => {
  const {
    userDataState,
    isProductInWishlist,
    removeFromCartHandler,
    wishlistHandler,
    cartCountHandler,
    cartLoading,
  } = useUserData();

  return (
    <div className="cart-products-container">
      {userDataState.cartProducts.map((product) => (
        <div className="cart-product-card" key={product.id}>
          <div className="cart-img-container">
            <img className="cart-img" alt={product.name} src={product.img} />
          </div>
          <div>
            <div className="product-actions">
              <div className="product-description">
                <h3>{product.name}</h3>
                <p>Size: {product.size}</p>
              </div>
              <span className="price">
                <HiCurrencyDollar />
                {product.discounted_price}
              </span>
            </div>
            <div className="button-section">
              <div className="count-btn-container">
                <button
                  disabled={cartLoading}
                  className="counter-btn"
                  onClick={() => cartCountHandler(product, "decrement")}
                >
                  -
                </button>
                <span>{product.qty}</span>
                <button
                  disabled={cartLoading}
                  className="counter-btn"
                  onClick={() => cartCountHandler(product, "increment")}
                >
                  +
                </button>
                <div className="remove-button">
                  <MdDelete
                    size={25}
                    onClick={() => removeFromCartHandler(product)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

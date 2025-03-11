import "./CartProductsSummary.css";

import React from "react";
import { HiCurrencyDollar } from "react-icons/hi";
import { useUserData } from "../../../../contexts/UserDataProvider.js";

export const CartProductsSummary = () => {
  const { userDataState } = useUserData();
  return (
    <div className="product-details-container">
      <div className="ordered-products-container">
        {userDataState.cartProducts?.map(
          ({ id, img, name, qty, discounted_price }) => (
            <div key={id} className="ordered-product-card">
              <img src={img} alt={name} />
              <div className="ordered-product-description">
                <h3>{name}</h3>
                <p>Qty: {qty}</p>
              </div>
              <span className="ordered-price">
                <HiCurrencyDollar />
                {discounted_price}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

import React, { useEffect } from "react";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import "./CartAmountSummary.css";

import { useCart } from "../../../../contexts/CartProvider.js";

export const CartAmountSummary = ({ couponSelected }) => {
  const { userDataState } = useUserData();
  const { setTotalCouponDiscount, setTotalDiscountedPriceAfterCoupon, setTotalOriginalPrice} = useCart();

  const totalDiscountedPriceBeforeCoupon = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.discounted_price * curr.qty,
    0
  );

  const totalCouponDiscount = couponSelected?.reduce(
    (acc, curr) =>
      curr.amount
        ? acc + curr.amount
        : acc + (curr.discount * totalDiscountedPriceBeforeCoupon) / 100,
    0
  );

  const totalDiscountedPriceAfterCoupon = (
    totalDiscountedPriceBeforeCoupon - totalCouponDiscount
  ).toFixed(2);

  const totalOriginalPrice = userDataState.cartProducts?.reduce(
    (acc, curr) => acc + curr.original_price * curr.qty,
    0
  );

  const isCouponApplied = couponSelected.length ? true : false;

  useEffect(() => setTotalCouponDiscount(totalCouponDiscount), [totalCouponDiscount]);
  useEffect(() => setTotalDiscountedPriceAfterCoupon(totalDiscountedPriceAfterCoupon), [totalDiscountedPriceAfterCoupon]);
  useEffect(() => setTotalOriginalPrice(totalOriginalPrice), [totalOriginalPrice]);

  return (
    <div className="cart-price-container">
      <h1>Summary</h1>
      <div className="subtotal-container">
        <span>Sub-total: </span>
        <span>${totalOriginalPrice}</span>
      </div>
      <div className="discount-container">
        <span>Discount: </span>
        <span>-${totalOriginalPrice - totalDiscountedPriceBeforeCoupon}</span>
      </div>
      {isCouponApplied && (
        <div className="discount-container">
          <span>Coupon Discount: </span>
          <span> -${totalCouponDiscount}</span>
        </div>
      )}
      <div className="shipping-container">
        <span>Estimated Delivery & Handling:</span>
        <span>Free</span>
      </div>
      <div className="total">
        <span className="total-container">Total: </span>
        <span>${totalDiscountedPriceAfterCoupon}</span>
      </div>

      <div className="total-discount-container">
        <span>
          You saved <b>$
          {(totalOriginalPrice - totalDiscountedPriceAfterCoupon).toFixed(2)}{" "}</b>
        </span>
      </div>
    </div>
  );
};

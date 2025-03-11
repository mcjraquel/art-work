import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import "./Cart.css";

import { CartListing } from "../CartListing/CartListing.jsx";
import { Coupons } from "../Coupons/Coupons.jsx";
import { CartAmountSummary } from "../CartAmountSummary/CartAmountSummary.jsx";
import { useUserData } from "../../contexts/UserDataProvider.js";
import { useData } from "../../contexts/DataProvider.js";
import { useCart } from "../../contexts/CartProvider.js";
import { useCheckout } from "../../contexts/CheckoutProvider.js";

export const Cart = () => {
  const [couponSelected, setCouponSelected] = useState([]);
  const { userDataState, dispatch } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();
  const { setCartIsShown, totalCouponDiscount, totalDiscountedPriceAfterCoupon, totalOriginalPrice } = useCart();
  const { setCheckoutIsShown } = useCheckout();

  const placeOrderHandler = () => {
    setCartIsShown(false);
    dispatch({
      type: "SET_ORDER",
      payload: {
        cartItemsTotal: totalOriginalPrice,
        cartItemsDiscountTotal: totalDiscountedPriceAfterCoupon,
        couponDiscountTotal: totalCouponDiscount,
        orderAddress: userDataState.addressList[0],
      },
    });
    setCheckoutIsShown(true);
  };

  return (
    <div>
      <div className="modal-bg"></div>
      <div className="modal">
        <div className="modal-close">
          <IoMdClose
            onClick={() => setCartIsShown(false)}
          />
        </div>
        {!loading &&
        (userDataState.cartProducts.length ? (
          <div className="cart-content">
            <h1 className="page-heading">Cart</h1>
            <div className="cart-container">
              <CartListing />
              <div className="payment-section">
                <Coupons
                  couponSelected={couponSelected}
                  setCouponSelected={setCouponSelected}
                />
                <CartAmountSummary couponSelected={couponSelected} />
              </div>
            </div>
            <Link onClick={placeOrderHandler}>
              Place Order
            </Link>
          </div>
        ) : (
          <div className="no-items-container">
            <h2 className="page-heading">Cart is Empty!</h2>
            <button
              className="explore-btn"
              onClick={() => {
                setCartIsShown(false);
                navigate("/product-listing");
              }}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthProvider.js";
import { useData } from "../../contexts/DataProvider.js";
import { useUserData } from "../../contexts/UserDataProvider.js";
import "./Checkout.css";
import { Modal } from "../Modal/Modal.jsx";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { CartProductsSummary } from "./components/CartProductsSummary/CartProductsSummary";
import { IoMdClose } from "react-icons/io";
import { useCheckout } from "../../contexts/CheckoutProvider.js";
import { BillingSummary } from "./components/BillingSummary/BillingSummary";

export const Checkout = () => {
  const { userDataState, dispatch, clearCartHandler } = useUserData();
  const navigate = useNavigate();
  const { loading } = useData();
  const { setCheckoutIsShown } = useCheckout();


  const {
    cartProducts,
    addressList,
    orderDetails: { cartItemsDiscountTotal, orderAddress },
  } = userDataState;

  const KEY_ID = "rzp_test_VAxHG0Dkcr9qc6";

  const totalAmount = cartItemsDiscountTotal;

  const userContact = addressList?.find(
    ({ _id }) => _id === orderAddress?._id
  )?.phone;

  const { auth, setCurrentPage } = useAuth();

  const successHandler = (response) => {
      const paymentId = response.razorpay_payment_id;
      const orderId = uuid();
      const order = {
        paymentId,
        orderId,
        amountPaid: totalAmount,
        orderedProducts: [...cartProducts],
        deliveryAddress: { ...orderAddress },
      };
  
      dispatch({ type: "SET_ORDERS", payload: order });
      clearCartHandler(auth.token);
      setCurrentPage("orders");
      navigate("/profile/orders");
    };
  
    const razorpayOptions = {
      key: KEY_ID,
      currency: "INR",
      amount: Number(totalAmount) * 100,
      name: "Art Waves Unleashed",
      description: "Order for products",
      prefill: {
        name: auth.firstName,
        email: auth.email,
        contact: userContact,
      },
      notes: { address: orderAddress },
      theme: { color: "#000000" },
      handler: (response) => successHandler(response),
    };
  
    const placeOrderHandler = () => {
      if (orderAddress) {
        const razorpayInstance = new window.Razorpay(razorpayOptions);
        razorpayInstance.open();
      } else {
        toast("Please select an address!");
      }
    };

  return (
    <Modal setModalIsShown={setCheckoutIsShown}>
      {
        !loading &&
        (userDataState.cartProducts.length ? (
          <div>
            <h1 className="page-heading">Checkout</h1>
            <div className="checkout-container">
              <CartProductsSummary />
              <div className="other-summaries-container">
                <AddressSection />
                <BillingSummary />
              </div>
            </div>
              <div className="place-order-btn-container">
                <button onClick={placeOrderHandler} className="place-order-btn">
                  Place Order
                </button>
            </div>
          </div>
        ) : (
          <div className="no-items-container">
            <h2 className="page-heading">No items in your cart to Checkout!</h2>
            <button
              className="explore-btn"
              onClick={() => {
                navigate("/product-listing");
                setCheckoutIsShown(false);
              }}
            >
              Explore
            </button>
          </div>
        ))
      }
    </Modal>
  )
};

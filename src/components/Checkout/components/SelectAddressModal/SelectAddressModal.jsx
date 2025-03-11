import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import "./SelectAddressModal.css";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { AddressModal } from "../AddressModal/AddressModal";

export const SelectAddressModal = () => {
  const { userDataState, dispatch } = useUserData();
  
  const { isAddressModalOpen, setIsAddressModalOpen, setIsSelectAddressModalOpen } = useAddress();
  const [chosenAddress, setChosenAddress] = useState(userDataState.orderDetails.orderAddress);

  return (
    <div>
      <div className="modal-bg"></div>
      <div className="modal">
        <div className="modal-close">
          <IoMdClose
            onClick={() => setIsSelectAddressModalOpen(false)}
          />
        </div>
        <h2 className="page-heading">Select Delivery Address</h2>
        {userDataState.addressList?.map((address, index) => {
          const { name, street, city, state, country, pincode, phone, _id } =
            address;

          return (
            <div key={_id} className="selection-address-card">
              <input
                checked={_id === chosenAddress?._id}
                onChange={() => setChosenAddress(address)}
                name="address"
                id={_id}
                type="radio"
              />
              <label htmlFor={_id}>
                <p className="name">{name}</p>
                <p className="address">
                  {street}, {city},{state}, {country} {pincode} - {phone}
                </p>
              </label>
            </div>
          );
        })}
        <div className="secondary-btn-container">
          <button className="secondary-btn" onClick={() => {
            console.log("chosen", chosenAddress)
            dispatch({
              type: "SET_ORDER",
              payload: { orderAddress: chosenAddress },
            });
            setIsSelectAddressModalOpen(false);
          }}>Save</button>
        </div>
        <div className="secondary-btn-container">
          <button
            className="secondary-btn-outline"
            onClick={() => setIsAddressModalOpen(true)}
          >
            Add New Address
          </button>
        </div>
      </div>
      {isAddressModalOpen && <AddressModal />}
    </div>
  )
}
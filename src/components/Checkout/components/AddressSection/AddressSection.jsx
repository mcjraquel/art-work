import "./AddressSection.css";
import React from "react";

import { useAddress } from "../../../../contexts/AddressProvider.js";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { SelectAddressModal } from "../SelectAddressModal/SelectAddressModal.jsx";

export const AddressSection = () => {
  const { userDataState } = useUserData();
  const { isSelectAddressModalOpen, setIsSelectAddressModalOpen } = useAddress();

  console.log(userDataState.addressList)
  console.log(userDataState.orderDetails.orderAddress)
  return (
    <div className="address-container">
      {userDataState.addressList?.map((address, index) => {
        const { name, street, city, state, country, pincode, phone, _id } =
          address;

        if (_id !== userDataState.orderDetails?.orderAddress?._id) {
          return null;
        }

        return (
          <div className="address-card">
            <p className="name">{name}</p>
            <p className="address">
              {street}, {city},{state}, {country} {pincode} - {phone}
            </p>
          </div>
        );
      })}
      <div className="secondary-btn-container">
        <button
          className="secondary-btn"
          onClick={() => setIsSelectAddressModalOpen(true)}
        >
          Change Address
        </button>
      </div>

      {isSelectAddressModalOpen && <SelectAddressModal />}
    </div>
  );
};

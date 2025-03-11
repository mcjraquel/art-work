import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({children}) {
    const [cartIsShown, setCartIsShown] = useState(false);
    const [totalCouponDiscount, setTotalCouponDiscount] = useState(0);
    const [totalDiscountedPriceAfterCoupon, setTotalDiscountedPriceAfterCoupon] = useState(0);
    const [totalOriginalPrice, setTotalOriginalPrice] = useState(0);

    return (
        <CartContext.Provider value={{
            cartIsShown,
            setCartIsShown,
            totalCouponDiscount,
            setTotalCouponDiscount,
            totalDiscountedPriceAfterCoupon,
            setTotalDiscountedPriceAfterCoupon,
            totalOriginalPrice,
            setTotalOriginalPrice,
        }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
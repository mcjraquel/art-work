import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export function CheckoutProvider({children}) {
    const [checkoutIsShown, setCheckoutIsShown] = useState(false);

    return (
        <CheckoutContext.Provider value={{checkoutIsShown, setCheckoutIsShown}}>
            {children}
        </CheckoutContext.Provider>
    )
}

export const useCheckout = () => useContext(CheckoutContext);
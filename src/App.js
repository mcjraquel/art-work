import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider.js";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Loader } from "./components/Loader/Loader";
import { Cart } from "./components/Cart/Cart.jsx";
import { Checkout } from "./components/Checkout/Checkout.jsx";
import { useCart } from "./contexts/CartProvider.js";
import { useCheckout } from "./contexts/CheckoutProvider.js";

function App() {
  const { loading } = useData();
  const { cartIsShown } = useCart();
  const { checkoutIsShown } = useCheckout();

  return (
    <div className="App">
      <Header />
      {loading && <Loader />}
      <NavRoutes />
      <ScrollToTop />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: { duration: 1500 },
          error: { duration: 1500 },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
      {cartIsShown && <Cart />}
      {checkoutIsShown && <Checkout />}
    </div>
  );
}

export default App;

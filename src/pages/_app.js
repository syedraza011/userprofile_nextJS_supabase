import "../styles/globals.css";
import { useState } from "react";
import { CartProvider } from "../../context/cartContext";

function MyApp({ Component, pageProps }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartProvider cartItems={cartItems} setCartItems={setCartItems}>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;

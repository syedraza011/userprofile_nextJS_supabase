import { createContext } from "react";

export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => {},
});

export const CartProvider = ({ children, cartItems, setCartItems }) => {
  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

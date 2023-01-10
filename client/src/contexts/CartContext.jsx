import React, { createContext, useState } from "react";

const DUMMY_CART = {
  id: 1,
  quantity: 2,
};

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([DUMMY_CART]);

  function addItem(newItem) {
    let newCart = [...cart, newItem];
    setCart(newCart);
  }

  function removeItem(id) {
    let newCart = cart.filter((item) => item.id !== id);
    console.log(cart);
    setCart(newCart);
  }

  function getCart(){
    return cart;
  }

  function getItemQuantity(){
    let currentQuantity = 0;
    cart.forEach(item => currentQuantity += item.quantity);

    return currentQuantity;
  }

  const value = {
    addItem,
    removeItem,
    getCart,
    getItemQuantity
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
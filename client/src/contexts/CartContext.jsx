import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isCartDrawerActive, setIsCartDrawerActive] = useState(false);

  //TODO: merge cart and product

  /*
  useEffect(() => {
    localStorage.setItem('cartKey', JSON.stringify(cart));
  }, [cart]);  
  */

  function setIsCartActiveHandler(newValue) {
    setIsCartDrawerActive(newValue);
  }

  function addItem(itemId, quantity) {
    let currentCart = cart;
    let itemIndex = currentCart.findIndex((item) => item.productId === itemId);

    if (itemIndex === -1) {
      currentCart.push({ productId: itemId, quantity });
    } else {
      let newQuantity = currentCart[itemIndex].quantity + quantity;
      currentCart[itemIndex] = {
        ...currentCart[itemIndex],
        quantity: newQuantity,
      };
    }
    updateCartQuantity(currentCart);
    setCart(currentCart);
  }

  function removeItem(itemId, quantity) {
    let currentCart = cart;
    let itemIndex = currentCart.findIndex((item) => item.productId === itemId);

    if (itemIndex === -1) {
      return;
    }

    let newQuantity = currentCart[itemIndex].quantity - quantity;
    if(newQuantity <= 0){
      currentCart.splice(itemIndex, 1);
    }else{
      currentCart[itemIndex] = {
        ...currentCart[itemIndex],
        quantity: newQuantity,
      };
    }

    updateCartQuantity(currentCart);
    setCart(currentCart);
  }

  function updateCartQuantity(currentCart) {
    let currentQuantity = 0;

    currentCart.forEach((item) => {
      currentQuantity += item.quantity;
    });
    setCartQuantity(currentQuantity);
  }

  const value = {
    cart,
    cartQuantity,
    addItem,
    removeItem,
    isCartDrawerActive,
    setIsCartActiveHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

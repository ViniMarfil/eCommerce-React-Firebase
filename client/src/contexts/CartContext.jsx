import React, { createContext, useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import {
  collection,
  getDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../api/firebase";

const DUMMY_CART = {
  id: 1,
  quantity: 2,
};

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const { user } = useContext(UserContext);

  const [cart, setCart] = useState([DUMMY_CART]);

  useEffect(() => {
    if (!user) {
      return;
    }
    let currentCart = [];

    async function getCartProducts() {
      const q = query(
        collection(db, "cart-products"),
        where("userId", "==", user.uid)
      );

      const docSnap = await getDocs(q);

      docSnap.forEach((doc) => {
        
        console.log(doc.id, " => ", doc.data());
      });
    }

    try {
      getCartProducts();
    } catch (error) {
      console.log({ error });
    }
  }, [user]);

  function addItem(newItem) {
    let newCart = [...cart, newItem];
    setCart(newCart);
  }

  function removeItem(id) {
    let newCart = cart.filter((item) => item.id !== id);
    console.log(cart);
    setCart(newCart);
  }

  function getCart() {
    return cart;
  }

  function getItemQuantity() {
    let currentQuantity = 0;
    cart.forEach((item) => (currentQuantity += item.quantity));

    return currentQuantity;
  }

  const value = { addItem, removeItem, getCart, getItemQuantity };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

import React, { createContext, useState, useContext, useEffect } from "react";
import UserContext from "./UserContext";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);

  //Snapshot subscription
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const q = query(collection(db, "cart"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let cartArrays = [];
      querySnapshot.forEach((doc) => {
        cartArrays.push({ ...doc.data(), id: doc.id });
      });
      setCart(cartArrays);
    });
    return () => unsubscribe();
  }, [user]);

  async function addItem(itemId, quantity) {
    if (!user || quantity === 0) {
      return;
    }

    var item = cart.find((item) => item.productId === itemId);
    try {
      if (!item) {
        await addDoc(collection(db, "cart"), {
          userId: user.uid,
          productId: itemId,
          quantity: quantity,
        });
        return;
      } else {
        let newQuantity = item.quantity + quantity;
        console.log(item);
        await setDoc(doc(db, "cart", item.id), {
          userId: user.uid,
          productId: itemId,
          quantity: newQuantity
        });
      }
    } catch (error) {
      console.log({ error });
    }
  }

  function removeItem(id) {
    return;
    //TODO
    let newCart = cart.filter((item) => item.id !== id);
    console.log(cart);
    setCart(newCart);
  }

  function getItemQuantity() {
    let currentQuantity = 0;
    cart.forEach((item) => (currentQuantity += item.quantity));

    return currentQuantity;
  }

  const value = { addItem, removeItem, getItemQuantity };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

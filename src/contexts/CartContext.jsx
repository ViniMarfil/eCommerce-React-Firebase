import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import { db } from "../api/firebase";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const [cart, setCart] = useLocalStorage("cartKey", []);
  const [firebaseCart, setFirebaseCart] = useState([]);
  const [isCartDrawerActive, setIsCartDrawerActive] = useState(false);
  
  let cartQuantity = updateCartQuantity(cart);
  

  //Cart only has productId and quantity
  //So we need to get the full product info from firebase
  //Don't think this is the cleanest solution, but it has to work
  useEffect(() => {
    async function getProductsFromCartAndMerge(currentCart) {
      const firebaseProducts = await getProductsFromCart(currentCart);
      const mergedCartAndProduct = mergeCartAndProduct(
        currentCart,
        firebaseProducts
      );
      setFirebaseCart([...mergedCartAndProduct]);
    }
    getProductsFromCartAndMerge(cart);
  }, [cart]);

  async function getProductsFromCart(currentCart) {
    if (currentCart.length === 0) return [];
    let productCart = [];
    let firebaseCartProductId = currentCart.map((item) => item.productId);
    //Firebase limits only 10 arrays in the "in" condition, so we need to loop
    do {
      let first10ProductId = firebaseCartProductId.splice(0, 10);

      let q = query(
        collection(db, "products"),
        where(documentId(), "in", first10ProductId)
      );

      let querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc, index, array) => {
        productCart.push({
          id: doc.id,
          ...doc.data(),
        });
      });
    } while (firebaseCartProductId.length > 0);
    return productCart;
  }

  function mergeCartAndProduct(currentCart, firebaseProducts) {
    if (currentCart.length === 0) return [];
    let mergedCart = [];
    let foundCartItem;
    firebaseProducts.forEach((productItem) => {
      foundCartItem = currentCart.find(
        (cartItem) => cartItem.productId === productItem.id
      );
      mergedCart.push({
        image: productItem.image,
        description: productItem.description,
        price: productItem.price,
        title: productItem.title,
        ...foundCartItem,
      });
    });
    return mergedCart;
  }

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
    setCart([...currentCart]);
  }

  function removeItem(itemId, quantity) {
    let currentCart = cart;
    let itemIndex = currentCart.findIndex((item) => item.productId === itemId);

    if (itemIndex === -1) {
      return;
    }

    let newQuantity = currentCart[itemIndex].quantity - quantity;
    if (newQuantity <= 0) {
      currentCart.splice(itemIndex, 1);
    } else {
      currentCart[itemIndex] = {
        ...currentCart[itemIndex],
        quantity: newQuantity,
      };
    }
    setCart([...currentCart]);
  }

  function updateCartQuantity(currentCart) {
    let currentQuantity = 0;

    currentCart.forEach((item) => {
      currentQuantity += item.quantity;
    });
    return currentQuantity;
  }

  const value = {
    cart,
    cartQuantity,
    addItem,
    removeItem,
    isCartDrawerActive,
    setIsCartActiveHandler,
    firebaseCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

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
  documentId,
  getDocs,
} from "firebase/firestore";
import { db } from "../api/firebase";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [isCartDrawerActive, setIsCartDrawerActive] = useState(true);

  //Snapshot subscription
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    const q = query(collection(db, "cart"), where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      //Get the cart item in firebase. Whoever, it only stores the productId and quantity
      let firebaseCart = [];
      querySnapshot.forEach((doc) => {
        firebaseCart.push({ ...doc.data(), id: doc.id });
      });
      if (firebaseCart.length === 0) {
        setCart([]);
        return;
      }

      //Get complete product info by the id array
      const finalCart = [];
      let firebaseCartProductId = firebaseCart.map((item) => item.productId);

      console.log("firebaseCartProductId", firebaseCartProductId)
      //return;
      do {
        let first10ProductId = firebaseCartProductId.splice(0, 10);

        let q2 = query(
          collection(db, "products"),
          where(documentId(), "in", first10ProductId)
        );

        let querySnapshot2 = await getDocs(q2);

        querySnapshot2.forEach((doc, index, array) => {
          finalCart.push({
            id: firebaseCart[0].id,
            productId: doc.id,
            ...doc.data(),
          }); //<--- test the fix
        });
      } while (firebaseCartProductId.length > 0);

      //Add the "quantity" property from the cart item in firebase to the complete product info
      finalCart.forEach((productItem) => {
        firebaseCart.find((cartItem) => {
          if (cartItem.productId === productItem.productId) {
            productItem.quantity = cartItem.quantity;
          }
        });
      });

      console.log("finalCart", finalCart)
      setCart(finalCart);
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
        await setDoc(doc(db, "cart", item.id), {
          userId: user.uid,
          productId: itemId,
          quantity: newQuantity,
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

  function setIsCartActiveHandler(newValue) {
    setIsCartDrawerActive(newValue);
  }

  const value = {
    addItem,
    removeItem,
    getItemQuantity,
    cart,
    isCartDrawerActive,
    setIsCartActiveHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

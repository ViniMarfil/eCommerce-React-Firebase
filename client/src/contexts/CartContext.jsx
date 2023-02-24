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
      //The cart doc only stores the productId, userId and quantity, it has no info about the price or name of the product.
      // So we need to:
      //1st - Get the cart from firebase
      //2nd - Get the products based on the productsId
      //3rd - Sort then merge both docs
      const firebaseCart = await getFirebaseCart(querySnapshot);
      const firebaseProducts = await getProductsFromCart(firebaseCart);
      const finalCart = mergeCartAndProduct(firebaseCart, firebaseProducts);
      setCart(finalCart);
    });
    return () => unsubscribe();
  }, [user]);

  async function getFirebaseCart(querySnapshot) {
    let firebaseCart = [];
    querySnapshot.forEach((doc) => {
      firebaseCart.push({ ...doc.data(), id: doc.id });
    });
    return firebaseCart;
  }

  async function getProductsFromCart(firebaseCart) {
    if (firebaseCart.length === 0) return [];
    let productCart = [];
    let firebaseCartProductId = firebaseCart.map((item) => item.productId);
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

  function mergeCartAndProduct(firebaseCart, firebaseProducts) {
    //Note: both the args must be already ordered by productId
    let { sortedFirebaseCart, sortedFirebaseProducts } = sortBothCarts(
      firebaseCart,
      firebaseProducts
    );

    let finalCart = sortedFirebaseCart;
    sortedFirebaseProducts.forEach((product, i) => {
      finalCart[i] = {
        image: product.image,
        price: product.price,
        title: product.title,
        ...finalCart[i],
      };
    });

    return finalCart;
  }

  function sortBothCarts(firebaseCart, firebaseProducts) {
    firebaseCart.sort(function (a, b) {
      const nameA = a.productId; // ignore upper and lowercase
      const nameB = b.productId;
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    firebaseProducts.sort(function (a, b) {
      const nameA = a.id.toUpperCase(); // ignore upper and lowercase
      const nameB = b.id.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    return {
      sortedFirebaseCart: firebaseCart,
      sortedFirebaseProducts: firebaseProducts,
    };
  }

  async function addItem(itemId, quantity) {
    if (!user || quantity === 0) {
      return;
    }

    var item = cart.find((item) => item.productId === itemId);

    if (item) {
      const newQuantity = item.quantity + quantity;
      await setDoc(doc(db, "cart", item.id), {
        userId: user.uid,
        productId: itemId,
        quantity: newQuantity,
      });
    } else {
      const docRef = await addDoc(collection(db, "cart"), {
        userId: user.uid,
        productId: itemId,
        quantity: quantity,
      });
      console.log("Document written with ID: ", docRef.id);
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

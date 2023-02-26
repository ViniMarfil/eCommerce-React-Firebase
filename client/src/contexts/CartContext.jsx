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
  const [isFetching, setIsFetching] = useState(false);
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

  /*
  async function addItem(itemId, quantity) {
    if (!user || quantity === 0) {
      return;
    }

    if (isFetching){
      console.log("It is still fetching! Wait a little longer.")
      return;
    }

    var item = cart.find((item) => item.productId === itemId);

    console.log("Item with id "+ itemId+ " STARTED being added/updated. Time: " + Date.now());
    setIsFetching(true);
    if (item) {
      const newQuantity = item.quantity + quantity;
      await setDoc(doc(db, "cart", item.id), {
        userId: user.uid,
        productId: itemId,
        quantity: newQuantity,
      });
    } else {
      await addDoc(collection(db, "cart"), {
        userId: user.uid,
        productId: itemId,
        quantity: quantity,
      });
    }
    setIsFetching(false);
    console.log("Item with id "+ itemId+ " STOPPED being added/updated. Time: " + Date.now());
  }
  */

  /*
  Known issue:
  Sometimes, thanks to the fetch mechanism, it add a new item instead of updating a new.
  It only breaks sometimes when clicking many times on different items.
  */
  /*
  async function addItem(itemId, quantity) {
    if (!user || quantity === 0) {
      return;
    }

    if (isFetching) {
      console.log("%cIt is still fetching! Wait a little longer.", "color:red");
      return;
    }

    var item = cart.find((item) => item.productId === itemId);

    setIsFetching(true);
    console.log("Started fetch");
    try {
      if (item) {
        const newQuantity = item.quantity + quantity;
        await setDoc(doc(db, "cart", item.id), {
          userId: user.uid,
          productId: itemId,
          quantity: newQuantity,
        });
      } else {
        await addDoc(collection(db, "cart"), {
          userId: user.uid,
          productId: itemId,
          quantity: quantity,
        });
      }
    } catch (e) {
      console.warn("Adding item error: ", e);
    } finally {
      setIsFetching(false);
      console.log("Ended fetch");
    }
  }
  */

  async function addItem(itemId, quantity) {
    if (!user) {
      return {
        success: false,
        message: "Please log in to add a item to your cart.",
      };
    }
    if (quantity === 0) {
      return { success: false, message: "Select a quantity first." };
    }
    if (isFetching) {
      console.log("%cIt is still fetching! Wait a little longer.", "color:red");
      return { success: false, message: "Adding item..." };
    }

    var item = cart.find((item) => item.productId === itemId);

    if (item) {
      return { success: false, message: "Item already in the cart.", code: "alreadyInTheCard" };
    }

    setIsFetching(true);
    try {
      await addDoc(collection(db, "cart"), {
        userId: user.uid,
        productId: itemId,
        quantity: quantity,
      });
    } catch (e) {
      console.warn("Adding item error: ", e);
    } finally {
      setIsFetching(false);
      return { success: true };
    }
  }

  async function addOrUpdateItem(itemId, quantity) {
    if (!user) {
      return {
        success: false,
        message: "Please log in to add a item to your cart.",
      };
    }
    if (quantity === 0) {
      return { success: false, message: "Select a quantity first." };
    }
    if (isFetching) {
      console.log("%cIt is still fetching! Wait a little longer.", "color:red");
      return { success: false, message: "Adding item..." };
    }

    var item = cart.find((item) => item.productId === itemId);

    setIsFetching(true);
    console.log("Started fetch");
    try {
      if (item) {
        const newQuantity = item.quantity + quantity;
        await setDoc(doc(db, "cart", item.id), {
          userId: user.uid,
          productId: itemId,
          quantity: newQuantity,
        });
      } else {
        await addDoc(collection(db, "cart"), {
          userId: user.uid,
          productId: itemId,
          quantity: quantity,
        });
      }
    } catch (e) {
      console.warn("Adding item error: ", e);
    } finally {
      setIsFetching(false);
      console.log("Ended fetch");
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
    addOrUpdateItem,
    removeItem,
    getItemQuantity,
    cart,
    isCartDrawerActive,
    setIsCartActiveHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

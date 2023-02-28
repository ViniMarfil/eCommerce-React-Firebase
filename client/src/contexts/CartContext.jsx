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
      //3rd - Deduplicate the items. Sometimes it happens, thanks to my terrible programming skills
      //4th - Merge both cart and product
      const firebaseCart = await getFirebaseCart(querySnapshot);
      const firebaseProducts = await getProductsFromCart(firebaseCart);
      const fixedFirebaseCart = deduplicateMergeFirebaseCart(firebaseCart);
      const fixedProducts = deduplicateMergeProducts(firebaseProducts);
      const mergedCart = mergeCartAndProduct(
        fixedFirebaseCart,
        fixedProducts
      );
      setCart(mergedCart);
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

  function deduplicateMergeFirebaseCart(firebaseCart) {
    let fixedFirebaseProducts = [];

    firebaseCart.forEach((item) => {
      let duplicatedItemIndex = fixedFirebaseProducts.findIndex(
        (e) => e.productId === item.productId
      );

      if (duplicatedItemIndex === -1) {
        fixedFirebaseProducts.push(item);
      } else {
        let newQuantity =
          fixedFirebaseProducts[duplicatedItemIndex].quantity + item.quantity;

        fixedFirebaseProducts[duplicatedItemIndex] = {
          ...fixedFirebaseProducts[duplicatedItemIndex],
          quantity: newQuantity,
        };
      }
    });

    return fixedFirebaseProducts;
  }

  function deduplicateMergeProducts(firebaseProducts) {
    let fixedFirebaseProducts = [];

    firebaseProducts.forEach((item) => {
      let duplicatedItemIndex = fixedFirebaseProducts.findIndex(
        (e) => e.id === item.id
      );

      if (duplicatedItemIndex === -1) {
        fixedFirebaseProducts.push(item);
      } else {
        let newQuantity =
          fixedFirebaseProducts[duplicatedItemIndex].quantity + item.quantity;

        fixedFirebaseProducts[duplicatedItemIndex] = {
          ...fixedFirebaseProducts[duplicatedItemIndex],
          quantity: newQuantity,
        };
      }
    });

    return fixedFirebaseProducts;
  }

  function mergeCartAndProduct(firebaseCart, firebaseProducts) {
    let mergedCart = [];
    let foundCartItem;
    firebaseProducts.forEach((productItem) => {
      foundCartItem = firebaseCart.find(
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

  /*
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
  */
  function validateFetch(quantity) {
    if (!user) {
      return {
        success: false,
        message: "Please log in first.",
      };
    }
    if (quantity === 0) {
      return { success: false, message: "Select a quantity first." };
    }
    if (isFetching) {
      console.log("%cIt is still fetching! Wait a little longer.", "color:red");
      return { success: false, message: "Working..." };
    }
  }

  /*
  Known issue:
  Sometimes, thanks to the fetch mechanism, it add a new item instead of updating a new.
  It only breaks sometimes when clicking many times on different items.
  Gave up trying to make this work
  Maybe the use of stores, useEffect or other library
  For now I am deduplicating client side
  */
  async function addItem(itemId, quantity) {
    validateFetch(quantity);

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
    removeItem,
    getItemQuantity,
    cart,
    isCartDrawerActive,
    setIsCartActiveHandler,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;

import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore";
import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../api/firebase";
import UserContext from "./UserContext";

export const WishlistContext = createContext(null);

export function WishlistContextProvider({ children }) {
  const { user } = useContext(UserContext);
  const [wishlist, setWishlist] = useState([]);

  //Snapshot subscription
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }
    const q = query(
      collection(db, "wishlist"),
      where("userId", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let wishlistArrays = [];
      querySnapshot.forEach((doc) => {
        wishlistArrays.push({ ...doc.data(), id: doc.id });
      });
      setWishlist(wishlistArrays);
    });
    return () => unsubscribe();
  }, [user]);

  function isProductInWishlist(itemId) {
    var index = wishlist.findIndex(item => item.productId === itemId);
    return index !== -1 ? true : false;
  }

  async function addOrRemoveWishlistItem(itemId){
    if(!user){
      return;
    }

    var item = wishlist.find(item => item.productId === itemId);

    if(!item){
      await addDoc(collection(db, "wishlist"), {
        userId: user.uid,
        productId: itemId
      });
    }else{
      await deleteDoc(doc(db, "wishlist", item.id));
    }
  }

  const values = { wishlist, isProductInWishlist, addOrRemoveWishlistItem };

  return (
    <WishlistContext.Provider value={values}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;

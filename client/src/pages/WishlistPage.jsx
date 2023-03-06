import {
  collection,
  documentId,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../api/firebase";
import { WishlistItem } from "../components";
import CartContext from "../contexts/CartContext";
import UserContext from "../contexts/UserContext";
import WishlistContext from "../contexts/WishlistContext";

function WishlistPage() {
  const { user } = useContext(UserContext);
  const { addItem,  } = useContext(CartContext);
  const { wishlist, addOrRemoveWishlistItem } = useContext(WishlistContext);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Wishlist context only have the productId and userId.
  //So we need to fetch the item from firebase
  useEffect(() => {
    async function getProductsFromFirebase(user, wishlist) {
      setIsLoading(true);
      if (!user || wishlist.length === 0) {
        setWishlistProducts([]);
        setIsLoading(false);
        return;
      }

      let currentWishlistProducts = [];
      let productIds = wishlist.map((item) => item.productId);

      //Firebase limits only 10 arrays in the "in" condition, so we need to loop
      do {
        let first10ProductId = productIds.splice(0, 10);
        let q = query(
          collection(db, "products"),
          where(documentId(), "in", first10ProductId)
        );
        let querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          currentWishlistProducts.push({
            id: doc.id,
            ...doc.data(),
          });
        });
      } while (productIds.length > 0);
      setWishlistProducts(currentWishlistProducts);
      setIsLoading(false);
    }

    getProductsFromFirebase(user, wishlist);
  }, [user, wishlist]);

  if (isLoading) {
    return (
      <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
        <div>Loading...</div>
      </section>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
        <h1 className="mb-10 text-5xl">
          Looks like you don't have any items in your wishlist yet.
        </h1>
      </section>
    );
  }

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
      <h1 className="mb-10 text-5xl">My wishlist</h1>
      <ul>
        {wishlistProducts.map((product) => (
          <WishlistItem
            key={product.id}
            id={product.id}
            price={product.price}
            title={product.title}
            image={product.image}
            description={product.description}
            addItem = {addItem}
            addOrRemoveWishlistItem = {addOrRemoveWishlistItem}
          />
        ))}
      </ul>
    </section>
  );
}

export default WishlistPage;

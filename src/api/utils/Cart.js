import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  id,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

//remover em colocar em products
/*
export async function getCartItems(currentCart) {
  if (!currentCart) {
    return;
  }
  let productIdArray = currentCart.map((item) => item.productId);

  if (productIdArray.length === 0) {
    return;
  }

  try {
    const cartRef = collection(db, "products");
    const q = query(cartRef, where(documentId(), "in", productIdArray));

    const querySnapshot = await getDocs(q);

    let cartItems = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      cartItems.push(doc.data());
    });

    return cartItems;

  } catch (error) {
    console.log({ error });
    return;
  }
}
*/
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getProduct(id) {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { success: true, data: docSnap.data() };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log({ error });
    return { success: false };
  }
}

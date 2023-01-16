import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { writeBatch, doc, addDoc, collection } from "firebase/firestore";
import { auth, provider, db } from "../api/firebase";
import { DUMMY_DATA } from "../data/DUMMY_DATA";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  
  /*
  async function isUserAdmin() {
    const coll = collection(db, "admins");
    const filteredQuery = query(coll, where('userId', '==', user.uid));

    const snapshot = await getCountFromServer(filteredQuery);
    const count = snapshot.data().count;
    return  count > 0 ? true : false;
    //console.log();
  }
  */

  async function createUser(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        return { success: true };
      })
      .catch((error) => {
        console.log({ error });
        const errorMessage = error.message;
        return { success: false, message: errorMessage };
      });
  }

  async function signIn(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        return { success: true };
      })
      .catch((error) => {
        console.log({ error });
        const errorMessage = error.message;
        return { success: false, message: errorMessage };
      });
  }

  async function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function signOutUser() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    createUser,
    signIn,
    signInWithGoogle,
    signOutUser,
    user
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export default UserContext;

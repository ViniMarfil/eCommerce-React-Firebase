import React, { createContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, provider } from "../api/firebase";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState();

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

  //Get user
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

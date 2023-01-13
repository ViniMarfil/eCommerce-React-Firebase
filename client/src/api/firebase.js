import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM6_cHlRlGeHMNpugtm_qbNfxFi4MK8HA",
  authDomain: "fir-tests-abadd.firebaseapp.com",
  projectId: "fir-tests-abadd",
  storageBucket: "fir-tests-abadd.appspot.com",
  messagingSenderId: "541402048157",
  appId: "1:541402048157:web:02ea6efd58b713f4d25674",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

//Components
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import Footer from "./components/Footer";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AccountPage from "./pages/AccountPage";
//Misc
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { db } from "./api/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { DUMMY_DATA } from "./data/DUMMY_DATA";
//Contexts
import { CartContextProvider } from "./contexts/CartContext";
import { UserContextProvider } from "./contexts/UserContext";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [popularProducts, setPopularProducts] = useState([]);

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    //In truth, it only gets 15 products. Close enough.
    const getPopularProducts = async () => {
      const q = query(collection(db, "products"), limit(15));
      const data = await getDocs(q);
      setPopularProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPopularProducts();
  }, []);

  return (
    <UserContextProvider>
      <CartContextProvider>
        <div
          className={
            "min-h-screen w-full bg-gradient-to-b from-cyan-600 to-blue-400 " +
            theme
          }
        >
          <Header theme={theme} switchTheme={switchTheme} />
          <Routes>
            <Route path="/" element={<MainPage products={popularProducts} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          <Footer />
        </div>
      </CartContextProvider>
    </UserContextProvider>
  );
}

export default App;

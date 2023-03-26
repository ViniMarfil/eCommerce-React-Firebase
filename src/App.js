import { Header, Footer, CartDrawer } from "./components";
import {
  MainPage,
  ProductPage,
  CheckoutPage,
  NotFoundPage,
  AccountPage,
  WishlistPage,
} from "./pages";
//Misc
import { Routes, Route } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { db } from "./api/firebase";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { useState, useEffect } from "react";
//Contexts
import { CartContextProvider } from "./contexts/CartContext";
import { UserContextProvider } from "./contexts/UserContext";
import { WishlistContextProvider } from "./contexts/WishlistContext";

function App() {
  const [theme, setTheme] = useLocalStorage("theme", "theme" ? "dark" : "light");
  const [popularProducts, setPopularProducts] = useState([]);
  console.log(theme);

  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

  useEffect(() => {
    //In truth, it only gets 15 products. Close enough.
    const getPopularProducts = async () => {
      const q = query(collection(db, "products"), limit(15));
      const data = await getDocs(q);
      setPopularProducts(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getPopularProducts();
  }, []);

  return (
    <UserContextProvider>
      <WishlistContextProvider>
        <CartContextProvider>
          <div
            className={
              "min-h-screen w-full bg-gradient-to-b from-cyan-600 to-blue-400 " +
              theme
            }
          >
            <Header theme={theme} switchTheme={switchTheme} />
            <CartDrawer />
            <Routes>
              <Route
                path="/"
                element={<MainPage products={popularProducts} />}
              />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </div>
        </CartContextProvider>
      </WishlistContextProvider>
    </UserContextProvider>
  );
}

export default App;

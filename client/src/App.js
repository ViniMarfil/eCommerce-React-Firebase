import Header from "./components/Header";
import useLocalStorage from "use-local-storage";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import NotFoundPage from "./pages/NotFoundPage";
import { CartContextProvider } from "./contexts/CartContext";
import { DUMMY_DATA } from "./data/DUMMY_DATA";
import Footer from "./components/Footer";
import { UserContextProvider } from "./contexts/UserContext";
import AccountPage from "./pages/AccountPage";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  function switchTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  }

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
            <Route path="/" element={<MainPage products={DUMMY_DATA} />} />
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

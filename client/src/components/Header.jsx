import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import { HiOutlineHeart } from "react-icons/hi";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";

import CartContext from "../contexts/CartContext";

import { DarkMode, Logo } from "./";
import { Link } from "react-router-dom";
import WishlistContext from "../contexts/WishlistContext";

const Header = ({ theme, switchTheme }) => {
  const { cartQuantity, setIsCartActiveHandler } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);

  return (
    <header
      className="sticky top-0 z-20 w-full bg-slate-300 py-2 px-8 
    text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-200 md:py-4"
    >
      <div className=" flex items-center justify-between ">
        <Logo />
        <SearchBar />
        <Icons
          cartQuantity={cartQuantity}
          getWishlistQuantity={() => wishlist.length}
          setIsCartActiveHandler={setIsCartActiveHandler}
        />
        <div className="absolute right-1 top-1">
          <DarkMode theme={theme} switchTheme={switchTheme} />
        </div>
      </div>
      <MobileSearchBar />
    </header>
  );
};

const SearchBar = () => {
  return (
    <div className="relative hidden w-full max-w-2xl px-2 md:flex">
      <input
        type="text"
        className="w-full rounded-l-lg border border-r-0 border-slate-500 py-3 px-3 font-medium focus:outline-none dark:border-transparent dark:text-slate-800"
        placeholder="Search"
      ></input>
      <button className="rounded-r-lg border border-slate-500 bg-slate-800 px-4 text-3xl text-white transition-colors hover:bg-slate-900 hover:text-orange-400 active:text-orange-600">
        <RiSearchLine />
      </button>
    </div>
  );
};

const MobileSearchBar = () => {
  return (
    <div className="relative m-auto flex w-full max-w-xl md:hidden">
      <input
        type="text"
        className="mt-2 w-full rounded-l-lg border border-r-0 border-slate-500 p-2 font-medium focus:outline-none dark:border-transparent dark:text-slate-800"
        placeholder="Search"
      ></input>
      <button className="mt-2 rounded-r-lg border border-slate-500 bg-slate-800 px-4 text-3xl text-white transition-colors hover:bg-slate-900 hover:text-orange-400 active:text-orange-600">
        <RiSearchLine />
      </button>
    </div>
  );
};

const Icons = ({
  cartQuantity,
  getWishlistQuantity,
  setIsCartActiveHandler,
}) => {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4">
      {/*Wish List */}
      <Link
        to="/wishlist"
        className="relative flex flex-col items-center justify-center transition hover:text-orange-600 active:text-orange-700 active:transition-none"
      >
        <div className="text-2xl ">
          <HiOutlineHeart />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Wish List
        </div>
        <span className="absolute right-2 top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white md:right-1 md:h-5 md:w-5">
          {getWishlistQuantity()}
        </span>
      </Link>
      {/*Cart */}
      <button
        className="relative flex flex-col items-center justify-center  transition hover:text-orange-500 active:text-orange-700 active:transition-none"
        onClick={() => setIsCartActiveHandler(true)}
      >
        <div className="text-2xl ">
          <FiShoppingCart />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Cart
        </div>
        <span className="absolute  right-[-8px] top-[-4px] flex h-4 w-4 items-center justify-center  rounded-full bg-orange-600 text-xs font-semibold text-white md:h-5 md:w-5">
          {cartQuantity}
        </span>
      </button>
      {/*Account */}
      <Link
        to="/account"
        className="relative flex flex-col items-center justify-center  transition hover:text-orange-500 active:text-orange-700 active:transition-none"
      >
        <div className="text-2xl">
          <VscAccount />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Account
        </div>
      </Link>
    </div>
  );
};

export default Header;

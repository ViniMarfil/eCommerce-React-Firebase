import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { IoIosArrowDropdown } from "react-icons/io";

import React from "react";
import DarkMode from "./DarkMode";
import Logo from "./Logo";

const Header = ({ theme, switchTheme }) => {
  return (
    <header className="relative z-10 bg-slate-300 py-2 px-8 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-200 md:py-4">
      <div className=" flex items-center justify-between ">
        <Logo />
        <SearchBar />
        <Icons />
        {/*<IconsMobile />*/}
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
    <div className="relative flex w-full max-w-xl m-auto md:hidden">
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

const Icons = () => {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4">
      {/*Wish List */}
      <a
        href="#"
        className="relative flex flex-col items-center justify-center transition hover:text-orange-600 active:text-orange-700 active:transition-none"
      >
        <div className="text-2xl ">
          <FaRegHeart />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Wish List
        </div>
        <span className="absolute right-2 top-[-4px] flex h-4 w-4 items-center justify-center rounded-full bg-orange-600 text-xs font-semibold text-white md:right-1 md:h-5 md:w-5">
          0
        </span>
      </a>
      {/*Cart */}
      <a
        href="#"
        className="relative flex flex-col items-center justify-center  transition hover:text-orange-500 active:text-orange-700 active:transition-none"
      >
        <div className="text-2xl ">
          <FiShoppingCart />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Cart
        </div>
        <span className="absolute  right-[-8px] top-[-4px] flex h-4 w-4 items-center justify-center  rounded-full bg-orange-600 text-xs font-semibold text-white md:h-5 md:w-5">
          0
        </span>
      </a>
      {/*Account */}
      <a
        href="#"
        className="relative flex flex-col items-center justify-center  transition hover:text-orange-500 active:text-orange-700 active:transition-none"
      >
        <div className="text-2xl">
          <VscAccount />
        </div>
        <div className="whitespace-nowrap text-xs leading-3 md:text-sm">
          Account
        </div>
      </a>
    </div>
  );
};

/*
const IconsMobile = () => {
  return (
    <button className="mr-2 flex items-center justify-center text-4xl transition hover:text-orange-500 active:text-orange-700 active:transition-none sm:hidden">
      <IoIosArrowDropdown />
    </button>
  );
};
*/

export default Header;

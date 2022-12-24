import { RiSearchLine } from "react-icons/ri";
import React from "react";
import DarkMode from "./DarkMode";
import Logo from "./Logo";

const Header = ({ theme, switchTheme }) => {
  return (
    <header className="bg-slate-300 py-4 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-200">
      <div className="container m-auto flex items-center justify-between">
        <Logo />

        {/*Search bar */}
        <div className="flex w-full relative max-w-xl">
          <span className="text-3xl absolute left-2 top-3 text-pink-800 ">
            <RiSearchLine/>
          </span>
          <input
            type="text"
            className="w-full rounded-l-full border border-r-0 border-slate-500 py-3 pl-12 pr-3 focus:outline-none"
            placeholder="Search"
          ></input>
          <button className="rounded-r-full border border-slate-500 bg-green-500 px-8 text-white transition hover:bg-transparent hover:text-green-500">
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

/*
const Navbar = ({ theme, switchTheme }) => {
  return (
    <header>
      <div className="h-12 w-full">
        <nav
          className="flex flex-row items-center justify-between bg-slate-300
         p-2 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
        >
          <Logo />
          <div className="min-w-fit max-w-[90%] bg-pink-500 mx-8">
            <input className=""></input>
          </div>

          <DarkMode theme={theme} switchTheme={switchTheme} />
        </nav>
      </div>
    </header>
  );
};
*/

//export default Navbar;

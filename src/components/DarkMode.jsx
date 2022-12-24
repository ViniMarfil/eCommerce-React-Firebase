import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkMode = ({ theme, switchTheme }) => {
  return (
    <button
      onClick={switchTheme}
      className="flex justify-center items-center rounded-full bg-slate-300 p-1 px-8 text-right shadow dark:bg-slate-900"
    >
      <DarkModeSwitch
        checked={theme === "light" ? false : true}
        onChange={() => {}}
        size={24}
      />
    </button>
  );
};

export default DarkMode;

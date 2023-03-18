import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const DarkMode = ({ theme, switchTheme }) => {
  return (
    <button
      onClick={switchTheme}
      className="flex items-center justify-center rounded-full bg-slate-300 p-1 shadow transition-colors hover:shadow-slate-900 dark:bg-slate-900 dark:hover:shadow-slate-200"
    >
      <DarkModeSwitch
        checked={theme === "light" ? false : true}
        onChange={() => {}}
        size={20}
      />
    </button>
  );
};

export default DarkMode;

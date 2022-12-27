import React from "react";
import logo from "../Images/LogoViniVini3.png";

const Logo = () => {
  return (
    <a href="#">
      <div className="flex flex-col items-center justify-center cursor-pointer select-none">
        <h1 className=" whitespace-nowrap tracking-widest font-montserrat text-3xl font-bold leading-none dark:text-slate-200">
          VINIVINI
        </h1>
        <h3 className="whitespace-nowrap font-montserrat text-lg leading-none font-bold text-orange-600">
          STORE
        </h3>
      </div>
    </a>
  );
};

export default Logo;

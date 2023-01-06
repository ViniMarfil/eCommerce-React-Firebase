import React from "react";
import { FiMail } from "react-icons/fi";
import { AiOutlineLinkedin, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="relative z-10 bg-slate-300 px-16 py-4 text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-200 md:px-32 md:py-8 ">
      <div className="grid grid-cols-2 divide-x-[1px] dark:divide-slate-300/50  divide-slate-800/50">
        <LeftSide />
        <RightSide />
      </div>
    </footer>
  );
};

const LeftSide = () => {
  return (
    <div className="flex flex-col items-start justify-center">
      {/* e-mail */}
      <div className="mb-2 flex flex-row items-center justify-center">
        <div className="mr-2 translate-y-[2px] rounded-full bg-slate-400 dark:bg-slate-900 p-3 text-2xl ">
          <FiMail />
        </div>
        <span className="font-semibold">viniciusmarfil@gmail.com</span>
      </div>

      {/* linkedIn */}
      <div className="mb-2 flex flex-row items-center justify-center">
      <div className="mr-2 translate-y-[2px] rounded-full bg-slate-400 dark:bg-slate-900 p-3 text-2xl ">
          <AiOutlineLinkedin />
        </div>
        <a
          className="font-semibold underline "
          href="https://www.linkedin.com/in/vin%C3%ADcius-marfil-afonso-67ab50176/"
        >
          LinkedIn
        </a>
      </div>

      {/* github */}
      <div className="mb-2 flex flex-row items-center justify-center">
      <div className="mr-2 translate-y-[2px] rounded-full bg-slate-400 dark:bg-slate-900 p-3 text-2xl ">
          <AiFillGithub />
        </div>
        <a
          className="font-semibold underline "
          href="https://github.com/ViniMarfil"
        >
          Github
        </a>
      </div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div className="flex flex-col items-start justify-center pl-4">
      <div className="mb-4">
        Site developed by <span className="italic">Vinícius Marfil Afonso</span>
      </div>

      <div className="">
        <h1 className="text-2xl font-semibold mb-1">Stack</h1>
        <ul>
          <li>React</li>
          <li>Tailwind</li>
          <li>Firebase</li>
        </ul>
      </div>
    </div>
  );
};
export default Footer;

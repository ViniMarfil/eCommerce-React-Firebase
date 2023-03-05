import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="relative bg-hero  bg-cover bg-center bg-no-repeat text-slate-900 pt-20"
    >
      <div className="absolute inset-0  backdrop-blur-[1px] bg-transparent bg-gradient-to-r from-slate-700/90 to-slate-600/10 bg-flip"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 md:flex md:h-[80vh] md:items-center md:px-8">
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl font-extrabold ">
            The store for
            <strong className="block font-extrabold text-orange-600 underline">
              your style
            </strong>
          </h1>

          <h2 className="mt-4 max-w-lg md:text-xl md:leading-relaxed">
            Gragas gragas gragas gragas gragas gragas gragas gragas gragas
            gragas
          </h2>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to=""
              className="text-md block w-full rounded bg-orange-600 px-12 py-3 font-medium text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 md:w-auto"
            >
              View the best deals
            </Link>

            <Link
              to=""
              className="text-md block w-full rounded bg-slate-100 px-12 py-3 font-medium text-orange-600 shadow hover:bg-slate-200 hover:text-orange-700 focus:outline-none active:bg-slate-50 active:text-orange-500 md:w-auto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react";

const bgUrl =
  "https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80";
const Hero = () => {
  return (
    <section
      class="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)]
     bg-cover bg-center bg-no-repeat text-slate-900"
    >
      <div class="absolute inset-0 bg-white/75 md:bg-transparent md:bg-gradient-to-r md:from-white/95 md:to-white/25"></div>

      <div class="relative mx-auto max-w-screen-xl px-4 py-32  md:flex md:h-[80vh] md:items-center md:px-8">
        <div class="max-w-xl text-center md:text-left">
          <h1 class="text-5xl font-extrabold ">
            Make your home a
            <strong class="block font-extrabold text-orange-600 underline">
              magic place
            </strong>
          </h1>

          <h2 class="mt-4 max-w-lg md:text-xl md:leading-relaxed">
            Gragas gragas gragas gragas gragas gragas gragas gragas gragas
            gragas
          </h2>

          <div class="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              class="text-md block w-full rounded bg-orange-600 px-12 py-3 font-medium text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 md:w-auto"
            >
              View the best deals
            </a>

            <a
              href="#"
              class="text-md block w-full rounded bg-slate-100 px-12 py-3 font-medium text-orange-600 shadow hover:bg-slate-200 hover:text-orange-700 focus:outline-none active:bg-slate-50 active:text-orange-500 md:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

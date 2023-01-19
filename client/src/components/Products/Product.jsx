import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Product = ({ id, title, price, description, image }) => {
  return (
    <div className="mb-4 h-80 min-w-[16rem] overflow-hidden rounded-lg border bg-white shadow-slate-900 hover:shadow-md dark:shadow-slate-100/20">
      <div className="relative z-20 flex h-[80%] w-full flex-col items-center justify-center">
        <img
          className="mb-10 h-full bg-inherit object-contain transition hover:scale-105 "
          src={image}
          alt={title}
        />
        <div className="absolute bottom-0 text-orange-600 text-3xl font-semibold">
          {"$"+price}
        </div>
      </div>
      <div className="h-[20%] bg-slate-100 flex flex-row justify-center items-center ">
        <div className="">
          <Link to={`/product/${id}`}>
            <ProductButton>
              <RiSearchLine />
            </ProductButton>
          </Link>
          <ProductButton>
            <FaRegHeart />
          </ProductButton>

          <ProductButton>
            <FiShoppingCart />
          </ProductButton>
        </div>
      </div>      
    </div>
  );
};

const ProductButton = ({ children, onClick }) => {
  return (
    <button
      className="m-2 rounded-full border hover:border-orange-500 active:border-orange-600 border-slate-800/70 bg-slate-200 p-3 text-2xl text-slate-900 hover:bg-slate-300 hover:text-orange-500 hover:shadow-xl active:bg-slate-400 active:text-orange-600  dark:bg-slate-400 dark:text-slate-200 dark:hover:bg-slate-500 dark:hover:text-orange-500 dark:hover:shadow-xl dark:active:bg-slate-600 dark:active:text-orange-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Product;

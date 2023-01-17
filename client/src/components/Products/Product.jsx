import React from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

const Product = ({ id, title, price, description, image, rating }) => {
  return (
    <div className="relative mb-4 h-80 overflow-hidden rounded-lg border bg-white shadow-slate-900 hover:shadow-md dark:shadow-slate-100/20 ">
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <div className="group absolute flex h-full w-full flex-row items-center justify-center transition hover:bg-slate-600/40">
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
        <img
          className="mb-4 h-[90%] transition hover:scale-105"
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};

const ProductButton = ({ children, onClick }) => {
  return (
    <button
      className="invisible m-2 rounded-full bg-slate-200 p-3 text-2xl text-slate-900 hover:bg-slate-300 hover:text-orange-500 hover:shadow-xl active:bg-slate-400 active:text-orange-600 group-hover:visible dark:bg-slate-400 dark:text-slate-200 dark:hover:bg-slate-500 dark:hover:text-orange-500 dark:hover:shadow-xl dark:active:bg-slate-600 dark:active:text-orange-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Product;

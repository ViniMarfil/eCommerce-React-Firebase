import React, { useContext } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
//import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import WishlistContext from "../../contexts/WishlistContext";
import CartContext from "../../contexts/CartContext";

const Product = ({ id, title, price, description, image }) => {
  const { isProductInWishlist, addOrRemoveWishlistItem } =
    useContext(WishlistContext);
  const { addItem } = useContext(CartContext);

  return (
    <div className="mb-4 h-80 min-w-[16rem] overflow-hidden rounded-lg border bg-white shadow-slate-900 hover:shadow-md dark:shadow-slate-100/20">
      <div className="relative z-10 flex h-[80%] w-full flex-col items-center justify-center">
        <Link to={`/product/${id}`} className="relative flex flex-col items-center justify-center h-full">
          <img
            className="mb-10 h-full bg-inherit object-contain transition hover:scale-105 "
            src={image}
            alt={title}
          />
        </Link>
        <div className="absolute bottom-0 text-3xl font-semibold text-orange-600">
          {"$" + price}
        </div>
      </div>

      <div className="flex h-[20%] flex-row items-center justify-center bg-slate-100 ">
        <div className="">
          {/*View product*/}
          <Link to={`/product/${id}`}>
            <ProductButton>
              <RiSearchLine />
            </ProductButton>
          </Link>

          {/*Add product to wishlist*/}
          <ProductButton onClick={() => addOrRemoveWishlistItem(id)}>
            {isProductInWishlist(id) ? <HiHeart /> : <HiOutlineHeart />}
          </ProductButton>

          {/*Add product to cart*/}
          <ProductButton onClick={() => addItem(id, 1)}>
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
      className="m-2 rounded-full border border-slate-800/70 bg-slate-200 p-3 text-2xl text-slate-900 hover:border-orange-500 hover:bg-slate-300 hover:text-orange-500 hover:shadow-xl active:border-orange-600 active:bg-slate-400 active:text-orange-600  dark:bg-slate-400 dark:text-slate-200 dark:hover:bg-slate-500 dark:hover:text-orange-500 dark:hover:shadow-xl dark:active:bg-slate-600 dark:active:text-orange-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Product;

import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../contexts/CartContext";
import { AiOutlineCloseCircle } from "react-icons/ai";
import CartDrawerItem from "./CartDrawerItem";

function CartDrawer() {
  const { cart, isCartDrawerActive, setIsCartActiveHandler } =
    useContext(CartContext);
  const background = (
    <div
      className="fixed top-0 z-20 h-screen w-screen bg-slate-900/40"
      onClick={() => setIsCartActiveHandler(false)}
    ></div>
  );

  const cartIsNotNull = (
    <>
      <ul className="mt-8 flex flex-col p-4 dark:text-slate-200">
        {cart.map((cartItem) => {
          return (
            <CartDrawerItem
              key={cartItem.productId}
              productId={cartItem.productId}
              quantity={cartItem.quantity}
            />
          );
        })}
      </ul>
      <div className="flex">
        <button
          className="text-md m-4 w-full rounded bg-orange-600 px-8 py-3 text-white
         shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
          onClick={() => console.log("Clicked!")}
        >
          Go to checkout
        </button>
      </div>
    </>
  );

  return (
    <>
      {isCartDrawerActive && background}
      <div
        className={
          "fixed right-0 top-0 z-40 h-screen w-80 overflow-y-auto border-l border-slate-900 bg-slate-300 transition-transform dark:bg-slate-600" +
          (isCartDrawerActive ? " translate-x-0 " : " translate-x-full")
        }
      >
        <button
          className="absolute  top-3 left-3 text-3xl hover:text-orange-600 active:text-orange-700 dark:text-slate-300 dark:hover:text-orange-600 dark:active:text-orange-700"
          onClick={() => setIsCartActiveHandler(false)}
        >
          <AiOutlineCloseCircle />
        </button>
        {cart.length === 0 ? <div>Nothing!</div> : cartIsNotNull}
      </div>
    </>
  );
}

export default CartDrawer;

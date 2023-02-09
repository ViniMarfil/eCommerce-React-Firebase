import React, { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CartDrawer() {
  const { cart, isCartDrawerActive, setIsCartActiveHandler } =
    useContext(CartContext);

    console.log(cart);
  const background = (
    <div
      className="fixed top-0 z-20 h-screen w-screen bg-slate-900/40"
      onClick={() => setIsCartActiveHandler(false)}
    ></div>
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
        <div>
          {cart.map(item => item.itemId)}
        </div>
      </div>
    </>
  );
}

export default CartDrawer;

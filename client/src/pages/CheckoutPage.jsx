import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckoutItem } from "../components";
import CartContext from "../contexts/CartContext";

function CheckoutPage() {
  const { firebaseCart } = useContext(CartContext);
  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function calculateTotalCartSum() {
    if (firebaseCart.length === 0) return 0;
    let currentFirebaseCart = firebaseCart;

    let totalSum = 0;
    currentFirebaseCart.forEach((item) => {
      totalSum += item.quantity * item.price;
    });

    return totalSum;
  }

  const totalSum = calculateTotalCartSum();

  if (firebaseCart.length === 0) {
    return (
      <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
        <h1 className="mb-10 text-5xl">Your cart is empty!</h1>
        <Link
          to="/"
          className="text-md my-1 flex w-full max-w-lg justify-center whitespace-nowrap rounded bg-orange-600 px-8 py-3 text-2xl font-medium text-white
               shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
        >
          <div>Go back to shopping</div>
        </Link>
      </section>
    );
  }

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
      <h1 className="mb-10 text-5xl">Checkout</h1>
      <ul>
        {firebaseCart.map((item) => (
          <CheckoutItem
            key={item.productId}
            productId={item.productId}
            title={item.title}
            quantity={item.quantity}
            image={item.image}
            description={item.description}
            price={item.price}
          />
        ))}
      </ul>
      <div className="mt-10">
        <div className="mb-2 text-7xl">
          Total:{" "}
          <span className=" font-semibold text-orange-500">
            ${totalSum.toFixed(2)}
          </span>
        </div>
        <button
          className="text-md my-1 w-full whitespace-nowrap rounded bg-orange-600 px-8 py-3 text-2xl font-medium text-white
               shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
          onClick={() => window.alert("Thanks for testing! Feel free to leave any feedback!")}
        >
          Complete the fictitious purchase
        </button>
      </div>
    </section>
  );
}

export default CheckoutPage;

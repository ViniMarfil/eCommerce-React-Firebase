import React, { useContext, useEffect } from "react";
import { CheckoutItem, CheckoutTotal } from "../components";
import CartContext from "../contexts/CartContext";

function CheckoutPage() {
  const { cart } = useContext(CartContext);

  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
      <h1 className="mb-10 text-5xl">Checkout</h1>
      <ul>
        {cart.map((item, index) => (
          <CheckoutItem
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
          />
        ))}
      </ul>
      <CheckoutTotal />
    </section>
  );
}

export default CheckoutPage;

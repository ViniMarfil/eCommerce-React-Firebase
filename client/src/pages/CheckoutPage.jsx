import React, { useContext, useEffect } from "react";
import CartContext from "../contexts/CartContext";

function CheckoutPage() {
  const { cart } = useContext(CartContext);

  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ul>
      {cart.map((item) => (
        <li key={item.id}>
          <div className="flex flex-col">
            <h1 className="text-3xl">Item id: {item.id}</h1>
            <h2>Quantity: {item.quantity}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CheckoutPage;

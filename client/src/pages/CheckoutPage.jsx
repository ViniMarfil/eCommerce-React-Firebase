import React, { useContext } from "react";
import CartContext from "../contexts/CartContext";

function CheckoutPage() {
  const { getCart } = useContext(CartContext);
  const cart = getCart();

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

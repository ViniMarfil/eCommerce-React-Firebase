import React, { useContext, useEffect } from "react";
import { CheckoutItem, CheckoutTotal } from "../components";
import CartContext from "../contexts/CartContext";

function CheckoutPage() {
  const { firebaseCart } = useContext(CartContext);
  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(firebaseCart)
  function calculateTotalCartPrice(){
    if(firebaseCart.length === 0) return 0;
    let currentFirebaseCart = firebaseCart;

    currentFirebaseCart.forEach(item => {
      console.log(item.quantity);
      console.log(item.price);
    });
  }

  //calculateTotalCartPrice();
  //console.log(firebaseCart);
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
      <CheckoutTotal />
    </section>
  );
}

export default CheckoutPage;

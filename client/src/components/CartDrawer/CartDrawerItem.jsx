import React, { useEffect, useState } from "react";
import { getProduct } from "../../api/utils/Products";

function CartDrawerItem({ id, image, title , price, quantity}) {

  let totalPrice = 0;
  if(price > 0 && quantity >0){
    totalPrice = price * quantity;
  }

  return (
    <>
      <li className="mb-6 mt-2 flex flex-col text-center">
      <h1 className="mb-4 text-lg">{id}</h1>
        <h1 className="mb-4 text-lg">{title}</h1>
        <div className="flex flex-row text-center justify-center">
          <div className="w-[40%] mr-4">

          <img
              src={image}
              alt={title}
              className="object-scale-down rounded-md"
            />
          </div>
          <div className="flex flex-col justify-center space-y-2">
            <div>${price}</div>
            <div>Quantity: {quantity}</div>
            <div>Total: ${totalPrice}</div>
          </div>
        </div>
      </li>
      <hr />
    </>
  );
}

export default CartDrawerItem;

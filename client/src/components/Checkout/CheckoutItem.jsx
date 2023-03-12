import React, { useContext } from "react";
import CartContext from "../../contexts/CartContext";

function CheckoutItem({
  productId,
  title,
  quantity,
  image,
  description,
  price,
}) {
  const { addItem, removeItem } = useContext(CartContext);

  if (!productId) {
    return <h1>Loading...</h1>;
  }

  let totalPrice = 0;
  if (price > 0 && quantity > 0) {
    totalPrice = price * quantity;
  }

  return (
    <li className="mx-32 mb-4 flex flex-col justify-center rounded-lg text-center shadow-lg">
      <div className="rounded-lg bg-slate-100 py-2 px-12 dark:bg-slate-600">
        <h1 className="mb-6 text-3xl">{title}</h1>

        <div className="flex flex-col items-center justify-between lg:flex-row">
          <img
            className="max-h-[10rem] rounded object-scale-down transition"
            src={image}
            alt={title}
          />

          <h3 className="mb-6 mt-6 min-w-[10rem] max-w-2xl overflow-hidden text-ellipsis px-4 text-xs lg:text-left">
            {description}
          </h3>

          <div className="flex flex-col justify-center space-y-4 text-2xl">
            <div>
              Total:{" "}
              <span className="font-semibold text-orange-500">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="mt-2 flex-row justify-center md:flex">
              <div className="flex max-w-md select-none flex-row items-center justify-center text-3xl md:mb-0">
                <span
                  className="cursor-pointer text-4xl"
                  onClick={() => removeItem(productId, 1)}
                >
                  -
                </span>
                <div className="mx-2 select-none rounded-lg border border-slate-800 px-4 text-right dark:border-slate-200">
                  {quantity}
                </div>
                <span
                  className="cursor-pointer text-4xl"
                  onClick={() => addItem(productId, 1)}
                >
                  +
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CheckoutItem;

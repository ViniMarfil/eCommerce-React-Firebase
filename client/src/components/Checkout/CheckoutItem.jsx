import React, { useContext, useEffect, useState } from "react";
import { getProduct } from "../../api/utils/Products";
import CartContext from "../../contexts/CartContext";

function CheckoutItem({ productId, quantity}) {
  const { addItem, removeItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  //Cart context only have the productId and quantity.
  //So we need to fetch the item from firebase
  useEffect(() => {
    async function getProductFromFirebase() {
      const firebaseProduct = await getProduct(productId);
      if (firebaseProduct.success) {
        setProduct(firebaseProduct.data);
      }
    }

    getProductFromFirebase();
  }, [productId]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  let totalPrice = 0;
  if (product.price > 0 && quantity > 0) {
    totalPrice = product.price * quantity;
  }

  return (
    <li className="mx-32 mb-4 flex flex-col justify-center rounded-lg text-center shadow-lg">
      <div className="rounded-lg bg-slate-100 py-2 px-12 dark:bg-slate-600">
        <h1 className="mb-6 text-3xl">{product.title}</h1>

        <div className="flex flex-col items-center justify-between lg:flex-row">
          <img
            className="max-h-[10rem] rounded object-scale-down transition"
            src={product.image}
            alt={product.title}
          />

          <h3 className="mb-6 mt-6 min-w-[10rem] max-w-2xl overflow-hidden text-ellipsis px-4 text-xs lg:text-left">
            {product.description}
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

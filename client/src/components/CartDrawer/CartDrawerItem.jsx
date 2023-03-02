import React, { useContext, useEffect, useState } from "react";
import { getProduct } from "../../api/utils/Products";
import CartContext from "../../contexts/CartContext";

function CartDrawerItem({ productId, quantity }) {
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
    <>
      <li className="mb-6 mt-2 flex flex-col text-center">
        <h1 className="mb-4 text-lg">{product.title}</h1>
        <div className="flex flex-row justify-center text-center">
          <div className="mr-4 w-[40%]">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-md object-scale-down"
            />
          </div>
          <div className="flex flex-col justify-center space-y-4 text-2xl">
            <div >Total: <span className="text-orange-500 font-semibold">${totalPrice.toFixed(2)}</span></div>
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
      </li>
      <hr />
    </>
  );
}

export default CartDrawerItem;

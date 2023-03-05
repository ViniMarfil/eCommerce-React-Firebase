import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../api/utils/Products";
import CartContext from "../contexts/CartContext";
import WishlistContext from "../contexts/WishlistContext";

function ProductPage() {
  const { id } = useParams();
  const { isProductInWishlist, addOrRemoveWishlistItem } =
    useContext(WishlistContext);
  const { addItem } = useContext(CartContext);

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function getProductDetails() {
      setIsLoading(true);
      const result = await getProduct(id);
      result.success ? setProduct(result.data) : setProduct(null);
      setIsLoading(false);
    }
    getProductDetails();
  }, []);

  //Force scroll to top on render
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function changeQuantity(amount) {
    let currentQuantity = quantity + amount;

    if (currentQuantity < 0) currentQuantity = 0;
    if (currentQuantity > 9) currentQuantity = 9;

    setQuantity(currentQuantity);
  }

  if (product) {
    return (
      <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
        <div className="flex flex-col md:flex-row ">
          <img
            className="max-h-[20rem] rounded object-contain transition hover:hover:scale-[1.01] md:max-h-[40rem]"
            src={product.image}
            alt={product.title}
          />
          <div className="mt-2 flex flex-col items-center md:items-start md:px-20 ">
            <h1 className="mb-10 block items-center text-3xl">
              {product.title}
            </h1>
            <h3 className="mb-10  max-w-4xl text-sm">{product.description}</h3>

            <div className="mb-10 text-7xl text-orange-600 md:text-5xl">
              {"$" + product.price}
            </div>
            <div className="flex-row justify-center md:flex">
              <div className="mr-4 mb-2 flex max-w-md select-none flex-row items-center justify-center text-5xl md:mb-0">
                <span
                  className="cursor-pointer "
                  onClick={() => changeQuantity(-1)}
                >
                  -
                </span>
                <div className="mx-2 select-none rounded-lg border border-slate-800 px-4 text-right dark:border-slate-200">
                  {quantity}
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => changeQuantity(1)}
                >
                  +
                </span>
              </div>
              <button
                className="text-md my-1 mr-4 w-full whitespace-nowrap break-keep rounded bg-orange-600 px-8 py-3 text-white
               shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
                onClick={() => {
                  addItem(id, quantity);
                  setQuantity(0);
                }}
              >
                Add to cart
              </button>
              <button
                className="text-md my-1 w-full whitespace-nowrap break-keep rounded bg-slate-100 px-8 py-3 font-medium text-orange-600 shadow
               hover:bg-slate-200 hover:text-orange-700 focus:outline-none active:bg-slate-50 active:text-orange-500 md:w-auto"
                onClick={() => addOrRemoveWishlistItem(id)}
              >
                {isProductInWishlist(id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 text-2xl dark:bg-slate-700 dark:text-slate-200">
        <h1>Loading...</h1>
      </section>
    );
  }

  //Not found
  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 text-2xl dark:bg-slate-700 dark:text-slate-200">
      <h1>Error! Looks like the product you searched for vanished.</h1>
    </section>
  );
}

export default ProductPage;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function ProductPage() {
  const { id } = useParams();
  const { getProduct } = useContext(UserContext);

  //Fetching product data
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductThenSet() {
      setIsLoading(true);
      const result = await getProduct(id);
      result.success ? setProduct(result.data) : setProduct(null);
      console.log(result);
      setIsLoading(false);
    }
    getProductThenSet();
  }, []);

  //Quantity logic
  const [quantity, setQuantity] = useState(0);

  function changeQuantity(amount) {
    let currentQuantity = quantity + amount;
    if (currentQuantity < 0) {
      currentQuantity = 0;
    }

    if (currentQuantity > 9) {
      currentQuantity = 9;
    }

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
          <div className="flex flex-col items-center md:items-start md:px-20 ">
            <h1 className="mb-10 block items-center text-3xl">
              {product.title}
            </h1>
            <h3 className="mb-10  max-w-4xl text-sm">{product.description}</h3>

            <div className="mb-10 text-7xl md:text-5xl text-orange-600">
              {"$" + product.price}
            </div>
            <div className="md: flex flex-row justify-center">
              <div className="mr-8 flex max-w-md select-none flex-row text-5xl">
                <span
                  className="cursor-pointer "
                  onClick={() => changeQuantity(-1)}
                >
                  -
                </span>
                <div className="mx-2 select-none rounded-lg border border-slate-800 px-4 text-right  dark:border-slate-200">
                  {quantity}
                </div>
                <span
                  className="cursor-pointer"
                  onClick={() => changeQuantity(1)}
                >
                  +
                </span>
              </div>
              <button className="whitespace-nowrap text-md cursor-pointer break-keep rounded bg-orange-600 px-8 py-3  text-white shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500 ">
                Add to cart
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

  return (
    <section className="flex min-h-[80vh] w-full flex-col items-center bg-slate-200 p-8 text-2xl dark:bg-slate-700 dark:text-slate-200">
      <h1>Error! Looks like the product you searched for vanished.</h1>
    </section>
  );
}

export default ProductPage;

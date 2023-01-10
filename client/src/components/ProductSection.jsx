import React from "react";
import Product from "./Product";

const ProductSection = ({ products }) => {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-slate-200 p-8 dark:bg-slate-700 dark:text-slate-200">
      <h1 className="mb-8 text-5xl uppercase">popular Products</h1>

      <div className="mx-auto grid max-w-sm grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              description={product.description}
              image={product.image}
              rating={product.rating}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ProductSection;

import React from "react";

function WishlistItem({ id, price, title, image, description, addItem, addOrRemoveWishlistItem }) {
  
  return (
    <li className="mb-4 flex flex-col justify-center mx-32 text-center rounded-lg shadow-lg">
      <div className="flex flex-col rounded-lg justify-between items-center md:flex-row py-2 px-12 bg-slate-100 dark:bg-slate-600">

        <img
          className="max-h-[10rem] rounded object-scale-down transition md:max-h-[10rem]"
          src={image}
          alt={title}
        />
        <div className="mt-2 flex flex-col items-center  justify-center md:items-start md:px-20 ">
          <h1 className="mb-10 block items-center text-3xl">{title}</h1>
          <h3 className="mb-10  max-w-4xl text-sm">{description}</h3>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 text-7xl text-orange-600 md:text-5xl">
            {"$" + price}
          </div>
          <button
            className="text-md my-1 w-full whitespace-nowrap break-keep rounded bg-orange-600 px-8 py-3 font-medium text-white
               shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
            onClick={() =>  addItem(id, 1)}
          >
            Add to cart
          </button>

          <button
            className="text-md my-1 w-full whitespace-nowrap break-keep rounded bg-slate-100 px-8 py-3 font-medium text-orange-600 shadow
               hover:bg-slate-200 hover:text-orange-700 focus:outline-none active:bg-slate-50 active:text-orange-500"
            onClick={() => addOrRemoveWishlistItem(id)}
          >
            Remove from wishlist
          </button>
        </div>
      </div>
    </li>
  );
}

export default WishlistItem;

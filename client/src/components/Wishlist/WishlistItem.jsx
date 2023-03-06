import React from "react";

function WishlistItem({
  id,
  price,
  title,
  image,
  description,
  addItem,
  addOrRemoveWishlistItem,
}) {
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

          <h3 className="mb-6 mt-6 max-w-2xl min-w-[10rem] px-4 text-xs lg:text-left text-ellipsis overflow-hidden">
            {description}
          </h3>

          <div className="mb-4 flex w-full flex-col items-center justify-center lg:w-fit">
            <div className="mb-4 text-7xl text-orange-600">{"$" + price}</div>
            <button
              className="text-md my-1 w-full whitespace-nowrap  rounded bg-orange-600 px-8 py-3 font-medium text-white
               shadow hover:bg-orange-700 focus:outline-none active:bg-orange-500"
              onClick={() => addItem(id, 1)}
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
      </div>
    </li>
  );
}

export default WishlistItem;

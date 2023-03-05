import React from "react";
import { Hero, ProductSection } from "../components/index";

function MainPage({ products }) {
  return (
    <>
      <Hero />
      <ProductSection products={products} />
    </>
  );
}

export default MainPage;
import React from "react";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";


function MainPage({products}) {
  return (
    <>
      <Hero />
      <ProductSection products={products}/>
    </>
  );
}

export default MainPage;

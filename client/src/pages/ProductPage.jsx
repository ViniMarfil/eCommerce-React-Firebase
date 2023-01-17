import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";

function ProductPage() {
  const { id } = useParams();
  const { getProduct } = useContext(UserContext);

  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProductThenSet() {
      setIsLoading(true);
      const result = await getProduct(id);
      result.success ? setProduct(result.data) : setProduct(null);
      setIsLoading(false);
    }
    getProductThenSet();
  }, [id, getProduct]);

  return (
    <>
      {isLoading && <h1>LOADING...</h1>}
      <button onClick={() => console.log(product)}>aa</button>
      <div>ProductPage {id}</div>
    </>
  );
}

export default ProductPage;

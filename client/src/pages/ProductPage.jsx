import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UserContext from '../contexts/UserContext';

function ProductPage() {
  const {id} = useParams();
  const {getProduct} = useContext(UserContext);

  useEffect(() => {
    getProduct(id);
  }, [])
  
  return (
    <div>ProductPage {id}</div>
  )
}

export default ProductPage
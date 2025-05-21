import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductShow = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="pagewidth">
      <p>{product.title}</p>

      <div className="hor">
        <p>Name:</p>
        <p>{product.title}</p>
      </div>

      <div className="hor">
        <p>Price:</p>
        <p>${product.price}</p>
      </div>

      <div className="hor">
        <p>Description:</p>
        <p>{product.description}</p>
      </div>

      <br />

      <Link to="/product">Back</Link> | <Link to={`/product/edit/${id}`}>Edit</Link>
    </div>
  );
};

export default ProductShow;

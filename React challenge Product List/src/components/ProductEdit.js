import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductEdit = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({ title: "", price: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios
      .put(`https://fakestoreapi.com/products/${id}`, product)
      .then((res) => {
        alert("Product updated!");
        navigate(`/product/show/${id}`);
      });
  };

  return (
    <div className="pagewidth">
      <p>Edit {product.title}</p>

      <div>
        <p>Name</p>
        <input name="title" value={product.title} onChange={handleChange} />
      </div>

      <div>
        <p>Price</p>
        <input name="price" value={product.price} onChange={handleChange} />
      </div>

      <div>
        <p>Description</p>
        <input
          name="description"
          value={product.description}
          onChange={handleChange}
        />
      </div>

      <div className="right">
        <button className="align-end" type="button" onClick={handleUpdate}>
          Update
        </button>
        <div>
          <Link to={`/product/show/${id}`}>Show</Link> | <Link to="/product">Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

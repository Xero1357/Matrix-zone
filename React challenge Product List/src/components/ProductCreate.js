import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ProductCreate = () => {
  const [product, setProduct] = useState({ title: "", price: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    axios.post("https://fakestoreapi.com/products", product).then((res) => {
      alert("Product created!");
      navigate("/product");
    });
  };

  return (
    <div className="pagewidth">
      <div className="center">
        <p>New Product</p>
      </div>

      <div>
        <p>Name</p>
        <input name="title" onChange={handleChange} />
      </div>

      <div>
        <p>Price</p>
        <input name="price" onChange={handleChange} />
      </div>

      <div>
        <p>Description</p>
        <input name="description" onChange={handleChange} />
      </div>

      <div className="right">
        <button className="align-end" onClick={handleCreate}>
          Create
        </button>
        <div>
          <Link to="/product">Go back</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;

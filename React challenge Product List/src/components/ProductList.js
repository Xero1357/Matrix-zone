import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data.slice(0, 5));
    });
  }, []);

  const handleDelete = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="grid-container">
      <div className="item1">
        <p className="margin5">Products</p>
      </div>

      <div className="item2">
        <table>
          <thead className="header-grey">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.description.substring(0, 50)}...</td>
                <td>${p.price}</td>
                <td>
                  <Link to={`/product/show/${p.id}`}>Show</Link> |{" "}
                  <Link to={`/product/edit/${p.id}`}>Edit</Link>{" "}
                  <button
                    className="align-end"
                    type="button"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link to="/product/create" id="add-product-link">
          Add product
        </Link>
      </div>
    </div>
  );
};

export default ProductList;

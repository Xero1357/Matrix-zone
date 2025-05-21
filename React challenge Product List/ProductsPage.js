import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    // Add delete logic here
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
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>
                  <Link to={`/product/show/${product.id}`}>Show</Link> | 
                  <Link to={`/product/edit/${product.id}`}>Edit</Link>
                  <button onClick={() => handleDelete(product.id)} className="align-end" type="button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <Link to="/product/new" id="add-product-link">Add product</Link>
      </div>
    </div>
  );
};

export default ProductsPage;
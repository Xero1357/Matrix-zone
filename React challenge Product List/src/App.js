import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductShow from "./components/ProductShow";
import ProductEdit from "./components/ProductEdit";
import ProductCreate from "./components/ProductCreate";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/show/:id" element={<ProductShow />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
        <Route path="/product/create" element={<ProductCreate />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </Router>
  );
}

export default App;




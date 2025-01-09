import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsListPage from './pages/ProductsListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsListPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

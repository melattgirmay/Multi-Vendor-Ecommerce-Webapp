// src/components/FilterBar.js
import React, { useState } from 'react';

const FilterBar = ({ setFilters }) => {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleFilterChange = () => {
    setFilters({
      category,
      priceRange,
    });
  };

  return (
    <div className="filter-bar">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="furniture">Furniture</option>
      </select>
      <input
        type="text"
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        placeholder="Price Range"
      />
      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
};

export default FilterBar;

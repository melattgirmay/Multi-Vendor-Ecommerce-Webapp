import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    const filters = {
      category,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    };
    onFilterChange(filters);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-2 px-52 rounded-lg shadow-lg">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded-lg"
        placeholder="Category"
      >
        <option value="">Select Category</option>
        <option value="Tech & Gadgets">Tech & Gadgets</option>
        <option value="Clothing">Clothing</option>
        <option value="Home & Kitchen">Home & Kitchen</option>
      </select>

      <input
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded-lg"
        placeholder="Min Price"
      />

      <input
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded-lg"
        placeholder="Max Price"
      />

      <button
        onClick={handleFilterChange}
        className="px-6 py-3 bg-[#008080] text-white font-semibold rounded-lg shadow-md hover:bg-teal-600"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterBar;
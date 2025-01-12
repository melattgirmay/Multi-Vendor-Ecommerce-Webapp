import React, { useState } from "react";

const FilterBar = ({ onFilter }) => {
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ category, priceRange });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-6 p-6 bg-white rounded-lg shadow-lg"
    >
      {/* Category Dropdown */}
      <div className="flex flex-col w-1/4">
        <label htmlFor="category" className="text-sm font-semibold text-gray-600 mb-1">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-teal-500"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Home">Home</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="flex flex-col w-1/3">
        <label className="text-sm font-semibold text-gray-600 mb-1">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })
            }
            className="p-2 border rounded-md w-full bg-gray-50 focus:ring-2 focus:ring-teal-500"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max}
            onChange={(e) =>
              setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 1000 })
            }
            className="p-2 border rounded-md w-full bg-gray-50 focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Filter Button */}
      <div className="w-1/4 flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-colors w-full"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
};

export default FilterBar;

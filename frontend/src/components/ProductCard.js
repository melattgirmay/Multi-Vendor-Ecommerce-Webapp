import React from "react";

const ProductCard = ({ product }) => {
  const baseUrl = "http://localhost:5000"; // Backend base URL
  console.log("Product Image URL:", product.imageUrl); // Debug log

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <img
        src={product.imageUrl ? `${baseUrl}${product.imageUrl}` : "/placeholder.jpeg"}
        alt={product.name}
        className="w-40 h-40 object-cover mb-4"
      />
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-teal-600 font-bold">{product.price.toFixed(2)} Birr</p>
    </div>
  );
};

export default ProductCard;

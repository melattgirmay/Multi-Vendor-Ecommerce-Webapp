import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="flex flex-col items-center justify-between bg-white rounded-xl shadow-xl overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-44 h-36 p-1 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-black">{product.name}</h3>
        <p className="text-gray-600 font-medium">{product.description}</p>
        <span className="text-gray-500 text-md">Price: {product.price} Birr</span>
      </div>
    </div>
  );
};

export default ProductCard;
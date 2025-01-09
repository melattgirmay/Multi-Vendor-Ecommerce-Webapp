import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        textAlign: 'center',
        width: '200px',
        margin: '10px',
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.name}</h3>
      <p style={{ color: '#008080', fontWeight: 'bold' }}>${product.price}</p>
      <button
        style={{
          backgroundColor: '#008080',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => alert(`Added ${product.name} to cart`)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;

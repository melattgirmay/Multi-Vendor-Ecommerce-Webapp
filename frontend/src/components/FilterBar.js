import React from 'react';

const FilterBar = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          style={{
            backgroundColor: category === selectedCategory ? '#008080' : '#fff',
            color: category === selectedCategory ? '#fff' : '#008080',
            border: '1px solid #008080',
            padding: '10px 15px',
            margin: '0 5px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          style={{
            backgroundColor: number === currentPage ? '#008080' : '#fff',
            color: number === currentPage ? '#fff' : '#008080',
            border: '1px solid #008080',
            padding: '10px 15px',
            margin: '0 5px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

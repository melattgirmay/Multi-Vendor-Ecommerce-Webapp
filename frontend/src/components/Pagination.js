import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-6">
      <ul className="pagination flex gap-2">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'bg-[#008080] text-white' : 'bg-white text-teal-500'} rounded-full`}
          >
            <a
              href="#!"
              onClick={() => paginate(number)}
              className="page-link px-4 py-2 block text-center rounded-full hover:bg-teal-200"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

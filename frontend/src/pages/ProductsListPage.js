import React, { useEffect, useState } from "react";
import { getProducts } from "../api/products"; // Import the getProducts API function
import ProductCard from "../components/ProductCard"; // Reusable ProductCard component
import FilterBar from "../components/FilterBar"; // Filtering options
import Pagination from "../components/Pagination";
import Headers from "../components/Header/Header" // Pagination controls

const ProductListPage = () => {
  const [products, setProducts] = useState([]); // State to store products
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products
  const [error, setError] = useState(null); // Error handling
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [productsPerPage] = useState(10); // Number of products per page

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(); // API call to fetch all products
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
      }
    };
    fetchProducts();
  }, []);

  // Handle filtering (e.g., by category, price)
  const handleFilter = (filterOptions) => {
    let updatedProducts = [...products];

    if (filterOptions.category) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filterOptions.category
      );
    }

    if (filterOptions.priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= filterOptions.priceRange.min &&
          product.price <= filterOptions.priceRange.max
      );
    }

    setFilteredProducts(updatedProducts);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Headers />
      <FilterBar onFilter={handleFilter} /> {/* Filter options */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} /> // Render each product
            ))}
          </div>
          <Pagination
            itemsPerPage={productsPerPage}
            totalItems={filteredProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      )}
    </div>
  );
};

export default ProductListPage;

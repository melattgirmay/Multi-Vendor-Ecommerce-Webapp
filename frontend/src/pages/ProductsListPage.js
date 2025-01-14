import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import Headers from "../components/Header/Header";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFilterChange = (filters) => {
    let updatedProducts = [...products];

    if (filters.category) {
      updatedProducts = updatedProducts.filter((product) => product.category === filters.category);
    }

    if (filters.minPrice !== null) {
      updatedProducts = updatedProducts.filter((product) => product.price >= filters.minPrice);
    }

    if (filters.maxPrice !== null) {
      updatedProducts = updatedProducts.filter((product) => product.price <= filters.maxPrice);
    }

    setFilteredProducts(updatedProducts);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col min-h-screen">
      <Headers />
      
      <section className="bg-gray-50">
        <FilterBar onFilterChange={handleFilterChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-center p-5">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </section>

      <Pagination
        itemsPerPage={productsPerPage}
        totalItems={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductListPage;
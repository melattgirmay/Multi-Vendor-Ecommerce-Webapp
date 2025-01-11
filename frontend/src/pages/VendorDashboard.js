//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\pages\VendorDashboard.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AddProduct from "../components/AddProduct"; // Import AddProduct component
import axios from "axios";

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]); // Initially empty, will be populated later
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false); // Toggle AddProduct form

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        if (!token) {
          console.error("No token found in localStorage");
        }

        const vendorResponse = await axios.get(
          "http://localhost:5000/api/Vendors/dashboard",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVendorData(vendorResponse.data);

        // Removed productsResponse request for now
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]); // Update the product list
    setShowAddProduct(false); // Hide the AddProduct form
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor-login");
  };

  // Close the AddProduct form
  const handleCloseModal = () => {
    setShowAddProduct(false);
  };

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen relative">
      {/* Header */}
      <div className="hidden md:flex items-center justify-between w-full px-10 bg-white shadow-md py-4">
        <Link to="/">
          <img src="/assets/icons/EcomIcon.svg" alt="Logo" className="h-20" />
        </Link>
        <div className="text-4xl text-black font-bold cursor-pointer">Vendor Panel</div>
        <button
          onClick={handleLogout}
          className="bg-red-700 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* Conditionally render AddProduct component as a modal */}
      {showAddProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleCloseModal} // Close modal when clicking outside
        >
          <div
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg transform transition-all duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <AddProduct onClose={handleCloseModal} onProductAdded={handleProductAdded} />
          </div>
        </div>
      )}

      {/* Promotional Banner */}
      <section
          className="flex flex-col mt-4 mb-2 md:flex-row items-center justify-between p-8 gap-10 rounded-lg shadow-md"
          style={{
            background: "linear-gradient(to left, #99cdd8, #ffffff)",
          }}
        >
        <div className="max-w-6xl mx-auto text-center md:text-left px-8">
          <h2 className="text-4xl font-extrabold text-black mb-4">
            {vendorData?.shopName || "Your Shop Name"}
          </h2>
          <p className="text-lg text-black mb-6">
            Manage your products, view orders, and track your revenue, all in one dashboard. Boost your business now!
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="px-8 py-3 bg-[#008080] text-white font-semibold rounded-full shadow-md hover:bg-black transition-all duration-300">
              View Products
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Main Content */}
      <main className="flex-grow px-8 mt-2">
        {/* Info Cards */}
        <div className=" bg-[#ffffff] text-white  rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[ 
            {
              title: "Products",
              count: products.length, // Display current number of products
              action: "Add New Product",
              onClick: () => setShowAddProduct(true), // Show AddProduct form
            },
            { title: "Orders", count: 20, action: "View Orders" },
            { title: "Revenue", count: "$5000", action: "View Details" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[#99cdd8] p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="text-lg text-white mt-2">{item.count}</p>
              <button
                className="mt-4 px-6 py-2 bg-[#ffffff] text-black rounded-lg shadow-md hover:bg-black hover:text-white transition-all duration-300"
                onClick={item.onClick}
              >
                {item.action}
              </button>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="mt-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#99cdd8] text-white">
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Price</th>
                  <th className="px-6 py-3 text-left">Stock</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-100">
                    <td className="px-6 py-3">{product.name}</td>
                    <td className="px-6 py-3">${product.price}</td>
                    <td className="px-6 py-3">{product.stockQuantity}</td>
                    <td className="px-6 py-3 text-center">
                      <button className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600">
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-3 text-center text-gray-500"
                    >
                      No products found. Start adding your inventory!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VendorDashboard;

import React, { useState, useEffect } from "react";
import VendorHeader from "../components/VendorHeader";
import Footer from "../components/Footer";
import axios from "axios";

const VendorDashboard = () => {
  const [vendorData, setVendorData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("vendorToken");
        if (!token) {
          console.error("No token found in localStorage");
        }

        const vendorResponse = await axios.get("http://localhost:5000/api/Vendors/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setVendorData(vendorResponse.data);

        const productsResponse = await axios.get("http://localhost:5000/api/Products", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col p-5  bg-gray-100">
      {/* Header */}
      <VendorHeader activeHeading={2} className="mt-3"/>

      {/* Promotional Banner */}
      <section
        className="flex items-center justify-between p-8 gap-10 rounded-lg shadow-lg mb-6"
        style={{
          background: "linear-gradient(90deg, #008080, #ffffff)",
        }}
      >
        <div className="flex flex-col items-center justify-center text-center md:text-left py-14 px-6">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            {vendorData?.shopName || "Vendor"}
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            Manage your products, view orders, and track your revenue in one place.
          </p>
          <button className="px-6 py-3 bg-white text-[#008080] font-semibold rounded-lg shadow-md hover:bg-gray-200">
            View Products
          </button>
        </div>
      </section>

      {/* Dashboard Main Content */}
      <main className="flex-grow px-6">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Products", count: products.length, action: "Add New Product" },
            { title: "Orders", count: 20, action: "View Orders" },
            { title: "Revenue", count: "$5000", action: "View Details" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
              <p className="text-lg text-gray-600 mt-2">{item.count}</p>
              <button className="mt-4 px-4 py-2 bg-[#008080] text-white rounded-lg shadow-md hover:bg-[#006666]">
                {item.action}
              </button>
            </div>
          ))}
        </div>

        {/* Products Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Products</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-[#008080] text-white">
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorDashboard;

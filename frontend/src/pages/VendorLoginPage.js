//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\pages\VendorLoginPage.js
import React, { useState } from "react";
import { vendorLogin } from "../api/Vendors"; // Ensure path is correct
import { Link, useNavigate } from "react-router-dom";


const VendorLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Both email and password are required!");
      return;
    }

    try {
      const response = await vendorLogin(formData);
      localStorage.setItem("vendorToken", response.token);
      navigate("/vendor-dashboard"); // Redirect to dashboard
    } catch (err) {
      setError(err.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 gap-6">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md py-5 px-8 w-full">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-20 w-20 mr-3"
          />
        </Link>
        <h1 className="text-5xl font-bold text-teal-600">Vendor Login</h1>
        <Link
          to="/"
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700"
        >
          Shop
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md mt-5 mb-16">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/become-vendor" className="text-teal-600 hover:underline">
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VendorLoginPage;

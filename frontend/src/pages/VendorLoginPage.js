// src/pages/VendorLoginPage.js
import React, { useState } from "react";
import { loginUser } from "../api/auth"; // API function for login
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import Footer from "../components/Footer";

const VendorLoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
      const response = await loginUser(formData); // Call the API function
      // Assuming the API returns a token
      localStorage.setItem("authToken", response.token);
      navigate("/vendor-dashboard"); // Redirect to VendorDashboard after successful login
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid email or password!";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md py-3 px-20">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-15 w-14 mr-3"
          />
        </Link>
        <h1 className="text-5xl font-bold text-teal-600 mb-8">Login</h1>
        <Link
          to="/"
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700"
        >
          Shop
        </Link>
      </div>

      {/* Main Form Section */}
      <main className="flex-grow flex items-center justify-center p-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
        >
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Login
          </button>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default VendorLoginPage;
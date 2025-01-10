import React, { useState } from "react";
import { registerVendor } from "../api/Vendors"; // Import API function
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const BecomeVendorPage = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!formData.shopName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Clear errors if all validations pass
    setError("");

    try {
      await registerVendor(formData); // API call to register Vendor
      setSuccess(true);
      setFormData({
        shopName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong!";
      setError(errorMessage);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md py-3 px-20">
        <Link to="/" className="flex items-center justify-between">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-15 w-14 mr-3"
          />
        </Link>
        <h1 className="text-5xl font-bold text-teal-600 mb-8">Become a Vendor</h1>
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
          {success && (
            <p className="text-green-600 text-center mb-4">
              Registration successful! You can now log in.
            </p>
          )}
          <div className="mb-6">
            <label htmlFor="shopName" className="block text-gray-700 font-medium mb-2">
              Shop Name
            </label>
            <input
              type="text"
              id="shopName"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your shop name"
            />
          </div>
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
              placeholder="Create a password"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Register
          </button>
          
          {/* Link to Vendor Login page */}
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link to="/vendor-login" className="text-teal-600 font-semibold">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BecomeVendorPage;

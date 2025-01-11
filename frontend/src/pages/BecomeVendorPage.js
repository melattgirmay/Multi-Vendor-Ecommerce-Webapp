import React, { useState } from "react";
import { registerVendor } from "../api/Vendors"; // Ensure path is correct
import { Link, useNavigate } from "react-router-dom";

const BecomeVendorPage = () => {
  const [formData, setFormData] = useState({
    shopName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.shopName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await registerVendor(formData);
      console.log("Vendor registered:", response.vendor);
      alert(response.message); // Show success message
      navigate("/vendor-login"); // Redirect to login page
    } catch (err) {
      console.error("Error during registration:", err);
      setError(err.message || "Failed to register");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between bg-white shadow-md py-5 px-8 w-full">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-20 w-20 mr-3"
          />
        </Link>
        <h1 className="text-5xl font-bold text-teal-600">Become a Vendor</h1>
        <Link
          to="/"
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700"
        >
          Shop
        </Link>
      </div>

      {/* Vendor Registration Form */}
      <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 max-w-lg mt-5">
        <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">
          Signup
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name"
            value={formData.shopName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            type="submit"
            className="w-full bg-teal-600 text-white font-bold py-2 rounded-lg hover:bg-teal-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/vendor-login" className="text-teal-600 hover:underline">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default BecomeVendorPage;

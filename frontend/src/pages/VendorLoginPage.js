import React, { useState } from "react";
import { vendorLogin } from "../api/vendors"; // Ensure path is correct
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Vendor Login</h1>
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

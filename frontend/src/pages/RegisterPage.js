import React, { useState } from "react";
import { registerUser } from "../api/user";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage("Registration successful!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="mb-10 bg-white shadow-md py-5 px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-16 w-16 mr-3"
          />
        </Link>
        <h1 className="text-3xl font-bold text-teal-600">Sign up</h1>
        <Link
          to="/"
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700"
        >
          Shop as Guest
        </Link>
      </div>

      {/* Register Form */}
      <div className=" mb-10 flex flex-1 items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition"
            >
              Register
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#008080] font-bold hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
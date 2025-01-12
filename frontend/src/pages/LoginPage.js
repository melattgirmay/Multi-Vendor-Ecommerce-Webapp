import React, { useState } from "react";
import { loginUser } from "../api/userApi";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);
      setMessage("Login successful!");
      navigate("/"); // Redirect to HomePage
    } catch (error) {
      setMessage(error.data?.message || "Login failed due to a server error.");
    }
  };

  return (
    <div className=" bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white mb-10 shadow-md py-5 px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt="E-commerce Logo"
            className="h-16 w-16 mr-3"
          />
        </Link>
        <h1 className="text-3xl font-bold text-teal-600">Login</h1>
        <Link
          to="/"
          className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700"
        >
          Shop as Guest
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 mb-10 items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#008080]"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#008080] text-white font-semibold rounded-lg hover:bg-[#006666] transition"
            >
              Login
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#008080] font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

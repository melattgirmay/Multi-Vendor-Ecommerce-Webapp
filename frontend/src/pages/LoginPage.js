import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../api/User";  // Import the login function from api/User.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await userLogin({ email, password });  // Use the imported userLogin function
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    } catch (error) {
      setMessage(error?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white mb-10 shadow-md py-5 px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/assets/icons/EcomIcon.svg" alt="E-commerce Logo" className="h-16 w-16 mr-3" />
        </Link>
        <h1 className="text-3xl font-bold text-teal-600">Login</h1>
        <Link to="/" className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700">
          Shop as Guest
        </Link>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 mb-10 items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <form className="space-y-4" onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="w-full py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
          <p className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-600 font-bold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

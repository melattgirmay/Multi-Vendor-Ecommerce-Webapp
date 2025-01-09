import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock API call or integrate with the backend
        console.log('Logging in with:', formData);
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-white shadow-md py-3 px-20">
                <Link to="/" className="flex items-center justify-between">
                    <img
                        src="/assets/icons/EcomIcon.svg"
                        alt="E-commerce Logo"
                        className="h-15 w-14 mr-3"
                    />
                </Link>
                <h1 className="text-5xl font-bold text-teal-600 mb-8">Login</h1>
                <Link to="/" className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700">
                    Shop as a Guest
                </Link>
            </div>
            <div className="flex flex-col items-center justify-center p-20 bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                >
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-teal-600 text-white font-bold rounded-md"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-teal-600">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

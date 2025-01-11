//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\components\VendorHeader.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaBars } from "react-icons/fa";

const VendorHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor-login");
  };

  return (
    <div>
      {/* Sticky Header */}
      <div className="fixed top-0 left-0 z-10 bg-customBlue shadow-md w-full h-16 flex items-center justify-between px-6 md:px-10 text-white">
        {/* Logo or Branding */}
        <div className="text-xl font-semibold cursor-pointer">Vendor Panel</div>

        {/* Menu & Profile */}
        <div className="flex items-center space-x-6">
          <button className="text-2xl lg:hidden">
            <FaBars />
          </button>
          <Link to="/vendor-dashboard" className="flex items-center space-x-2">
            <CgProfile size={28} />
            <span className="hidden md:block">Dashboard</span>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;

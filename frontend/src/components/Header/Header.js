import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Sidebar from "../Sidebar"; // Import Sidebar

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") ? true : false);
  const [cartItemsCount, setCartItemsCount] = useState(0); // State for cart count
  const [wishlistItemsCount, setWishlistItemsCount] = useState(0); // State for wishlist count
  const [showCart, setShowCart] = useState(false); // State to show cart sidebar
  const [showWishlist, setShowWishlist] = useState(false); // State to show wishlist sidebar
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Just set the authentication state and don't navigate anywhere
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSignInPrompt = (type) => {
    alert(`Please sign in first to view your ${type}.`);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const toggleCartSidebar = () => setShowCart(!showCart);
  const toggleWishlistSidebar = () => setShowWishlist(!showWishlist);

  return (
    <div>
      {/* Top Header */}
      <div className="hidden md:flex items-center justify-between w-full px-10 bg-gray-100">
        <Link to="/">
          <img src="/assets/icons/EcomIcon.svg" alt="Logo" className="h-21" />
        </Link>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full h-10 px-4 border-2 border-customBlue rounded-lg"
          />
          <AiOutlineSearch size={24} className="absolute right-3 top-3 cursor-pointer" />
        </div>
        <div className="bg-black text-white px-4 py-2 rounded-lg">
          {isAuthenticated ? (
            <span onClick={handleSignOut}>Logout</span> // Logout button now only signs out, no navigation
          ) : (
            <Link to="/become-Vendor">
              <span>
                Become Vendor <IoIosArrowForward className="inline-block ml-1" />
              </span>
            </Link>
          )}
        </div>
      </div>

      {/* Sticky Header */}
      <div
        className={`${
          active ? "shadow fixed top-0 left-0 z-10 bg-customBlue" : ""
        } hidden md:flex items-center justify-center w-full h-16 bg-customBlue`}
      >
        <div className="flex items-center justify-between w-full px-10">
          {/* Dropdown Button */}
          <div ref={dropdownRef} onClick={() => setDropDown(!dropDown)} className="relative">
            <button className="flex items-center px-2 py-2 bg-white border rounded-md">
              <BiMenuAltLeft size={30} />
              <span className="ml-2">All Categories</span>
              <IoIosArrowDown className="ml-2" />
            </button>
            {dropDown && <DropDown />}
          </div>

          {/* Navbar */}
          <Navbar />

          {/* Icon Group */}
          <div className="flex items-center space-x-5">
            {/* Wishlist Icon with Count */}
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (!isAuthenticated) {
                  handleSignInPrompt("wishlist");
                } else {
                  toggleWishlistSidebar(); // Open wishlist sidebar
                }
              }}
            >
              <AiOutlineHeart size={28} className="text-white" />
              {isAuthenticated && wishlistItemsCount > 0 && (
                <span className="absolute top-0 right-0 text-xs text-white bg-red-600 rounded-full px-2">
                  {wishlistItemsCount}
                </span>
              )}
            </div>

            {/* Cart Icon with Count */}
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (!isAuthenticated) {
                  handleSignInPrompt("cart");
                } else {
                  toggleCartSidebar(); // Open cart sidebar
                }
              }}
            >
              <AiOutlineShoppingCart size={28} className="text-white" />
              {isAuthenticated && cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 text-xs text-white bg-green-600 rounded-full px-2">
                  {cartItemsCount}
                </span>
              )}
            </div>

            {/* Profile Icon */}
            {isAuthenticated ? (
              <CgProfile size={28} className="cursor-pointer text-white" /> // Just an icon, no link after login
            ) : (
              <Link to="/login">
                <CgProfile size={28} className="cursor-pointer text-white" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Render Sidebars */}
      {showCart && <Sidebar type="cart" items={[]} closeSidebar={toggleCartSidebar} />}
      {showWishlist && <Sidebar type="wishlist" items={[]} closeSidebar={toggleWishlistSidebar} />}
    </div>
  );
};

export default Header;

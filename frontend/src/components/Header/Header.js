//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\components\Header\Header.js
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { getCart} from "../../api/userApi"; // Adjust the import path if necessary

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [active, setActive] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  //const [wishlistCount, setWishlistCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null); // Reference to dropdown

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const fetchCart = async () => {
        try {
          const token = localStorage.getItem("token");
          if (token) {
            const cart = await getCart(token);  // Make sure getCart is using the correct URL
            setCartCount(cart?.length || 0);
          }
        } catch (error) {
          console.error("Failed to fetch cart", error);
        }
      };
      fetchCart();
    }
  }, []);  

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropDown(false); // Close dropdown if clicked outside
      }
    };

    // Add event listener to document
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener on component unmount
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
        <Link to="/become-Vendor" className="bg-black text-white px-4 py-2 rounded-lg">
          {isAuthenticated ? (
            <span onClick={handleSignOut}>Logout</span>
          ) : (
            <span>
              Become Vendor <IoIosArrowForward className="inline-block ml-1" />
            </span>
          )}
        </Link>
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
            {/* Wishlist Icon with Count 
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (!isAuthenticated) {
                  alert("Please sign in first to view wishlist.");
                } else {
                  navigate("/wishlist");
                }
              }}
            >
              <AiOutlineHeart size={28} className="text-white" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-vibrantPink text-white text-xs font-bold px-1 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </div>  */}

            {/* Cart Icon with Count */}
            <div
              className="relative cursor-pointer"
              onClick={() => {
                if (!isAuthenticated) {
                  alert("Please sign in first to view cart.");
                } else {
                  navigate("/cart");
                }
              }}
            >
              <AiOutlineShoppingCart size={28} className="text-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-vibrantPink text-white text-xs font-bold px-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Profile Icon */}
            {isAuthenticated ? (
              <CgProfile size={28} className="cursor-pointer text-white" />
            ) : (
              <Link to="/login">
                <CgProfile size={28} className="cursor-pointer text-white" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const WishlistSidebar = ({ onClose }) => {
  const [wishlist, setWishlist] = useState([]);
  const userToken = localStorage.getItem("token");  // Retrieve the token from localStorage

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userToken) {
        alert("Please log in to view your wishlist.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/users/wishlist", {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setWishlist(response.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        alert("Could not fetch wishlist.");
      }
    };

    fetchWishlist();
  }, [userToken]);

  return (
    <div className="wishlist-sidebar fixed top-0 right-0 h-full bg-white shadow-xl z-50 p-6 w-96">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-xl text-gray-500 hover:text-black"
      >
        <AiOutlineClose />
      </button>
      <h2 className="text-2xl font-semibold mb-4">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <ul className="space-y-4">
          {wishlist.map((item, index) => (
            <li key={index} className="flex items-center border-b pb-4">
              <img
                src={item.imageUrl} // Assuming the wishlist item contains an image URL
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <span className="text-lg font-medium">{item.name}</span>
                <div className="text-sm text-gray-500">Price: {item.price} Birr</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistSidebar;

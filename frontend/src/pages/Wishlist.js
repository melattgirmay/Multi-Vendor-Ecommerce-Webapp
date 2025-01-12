import React, { useEffect, useState } from "react";
import { getWishlist, updateWishlist } from "../api/userApi";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getWishlist(token);
        setWishlist(data.wishlist);
      } catch (error) {
        setMessage(error.response?.data?.message || "Failed to fetch wishlist.");
      }
    };
    fetchWishlist();
  }, []);

  const handleUpdate = async (updatedWishlist) => {
    try {
      const token = localStorage.getItem("token");
      const data = await updateWishlist(updatedWishlist, token);
      setWishlist(data.wishlist);
      setMessage("Wishlist updated successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update wishlist.");
    }
  };

  return (
    <div>
      <h1>Your Wishlist</h1>
      {wishlist.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <button onClick={() => handleUpdate(wishlist.filter((i) => i.id !== item.id))}>
            Remove
          </button>
        </div>
      ))}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Wishlist;

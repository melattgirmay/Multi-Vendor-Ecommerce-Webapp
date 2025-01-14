import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { getCartItems, getWishlistItems } from "../api/user"; // Import your API functions

const Sidebar = ({ type, closeSidebar }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const fetchedItems = type === "cart" ? await getCartItems() : await getWishlistItems();
        console.log("Fetched Wishlist Items:", fetchedItems); // Log the fetched items to check their structure
        setItems(fetchedItems); // Update the items state with fetched data
      } catch (error) {
        console.error(`Error fetching ${type}:`, error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchItems();
  }, [type]);    

  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-50">
      <div className="flex justify-between items-center p-4 bg-teal-500">
        <h2 className="text-white font-semibold">{type === "cart" ? "Your Cart" : "Your Wishlist"}</h2>
        <AiOutlineClose size={20} className="cursor-pointer text-white" onClick={closeSidebar} />
      </div>
      <div className="p-4">
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-center">No items in {type}</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item._id} className="flex justify-between items-center py-2 border-b">
                <span>{item.productId ? item.productId.name : "Product name not available"}</span>
                <span>
                  {type === "cart" 
                    ? `${item.quantity} x ${item.productId ? item.productId.price : "N/A"} Birr` 
                    : `${item.productId ? item.productId.price : "N/A"} Birr`}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

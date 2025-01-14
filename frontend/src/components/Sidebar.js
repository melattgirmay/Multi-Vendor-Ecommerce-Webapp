import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = ({ type, items, closeSidebar }) => {
  return (
    <div className="fixed top-0 right-0 w-64 bg-white shadow-lg h-full z-50">
      <div className="flex justify-between items-center p-4 bg-teal-500">
        <h2 className="text-white font-semibold">{type === "cart" ? "Your Cart" : "Your Wishlist"}</h2>
        <AiOutlineClose size={20} className="cursor-pointer text-white" onClick={closeSidebar} />
      </div>
      <ul className="p-4">
        {items.length === 0 ? (
          <p className="text-center">No items in {type}</p>
        ) : (
          items.map(item => (
            <li key={item._id} className="flex justify-between items-center py-2 border-b">
              <span>{item.name}</span>
              <span>{item.quantity || 1} x {item.price} Birr</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

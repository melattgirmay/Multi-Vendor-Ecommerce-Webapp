import React from "react";
import { Link } from "react-router-dom";

const DropDown = () => {
  const categories = [
    { name: "Electronics", path: "/category/electronics" },
    { name: "Fashion", path: "/category/fashion" },
    { name: "Home & Garden", path: "/category/home-garden" },
    { name: "Health & Beauty", path: "/category/health-beauty" },
    { name: "Sports", path: "/category/sports" },
    { name: "Toys", path: "/category/toys" },
  ];

  return (
    <div className="absolute left-0 top-12 bg-white border rounded-md shadow-md w-48">
      <ul className="py-2">
        {categories.map((category) => (
          <li key={category.name} className="px-4 py-2 hover:bg-gray-100">
            <Link
              to={category.path}
              className="block text-gray-700 hover:text-blue-500"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Best Selling", path: "/bestselling" },
    { name: "Products", path: "/products" },
    { name: "Events", path: "/events" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="flex items-center gap-10">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="text-white font-semibold transition-transform duration-300 hover:text-black hover:scale-125 hover:font-semibold"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(true); // State to control visibility of the subscription section

  // Define the links directly inside the component
  const footerCompanyLinks = [
    { name: "About Us", link: "/about" },
    { name: "Careers", link: "/careers" },
    { name: "Store Locations", link: "/locations" },
    { name: "Our Blog", link: "/blog" },
    { name: "Reviews", link: "/reviews" },
  ];

  const footerProductLinks = [
    { name: "Game & Video", link: "/game-video" },
    { name: "Phone & Tablets", link: "/phone-tablets" },
    { name: "Computers & Laptop", link: "/computers-laptop" },
    { name: "Sport Watches", link: "/sport-watches" },
    { name: "Events", link: "/events" },
  ];

  const footerSupportLinks = [
    { name: "FAQ", link: "/faq" },
    { name: "Reviews", link: "/reviews" },
    { name: "Contact Us", link: "/contact" },
    { name: "Shipping", link: "/shipping" },
    { name: "Live Chat", link: "/chat" },
  ];

  // Function to hide the subscription section
  const hideSubscribeSection = () => {
    setIsSubscribed(false);
  };

  return (
    <div className="bg-[#000] text-white">
      {isSubscribed && (
        <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#99cdd8] py-7 relative" id="subscribe-section">
          <button 
            className="absolute top-2 right-2 text-2xl text-[#005F6F] font-bold"
            onClick={hideSubscribeSection}>
            &times; {/* X symbol */}
          </button>
          
          <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
            <span className="text-[#005F6F]">Subscribe</span> us to get news{" "}
            <br />
            events and offers
          </h1>
          
          <div>
            <input
              type="text"
              required
              placeholder="Enter your email..."
              className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
            />
            <button className="bg-[#005F6F] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full">
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src="/assets/icons/EcomIcon.svg"
            alt=""
          />
          <br />
          <p>The home and elements needed to create beautiful products.</p>
          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerCompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2025 Melat Girmay. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="/assets/icons/footer-payment.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;

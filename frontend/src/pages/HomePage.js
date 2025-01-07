import React from "react";
import Header from '../components/Header/Header';
import { Footer } from "../components/Footer";  // Named export
// Remove the import for styles if you're not using them
// import styles from "../styles/styles"; 

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header activeHeading={1} /> 

      {/* Main Content */}
      <main className="bg-gray-50 flex-grow">
        <div className="py-10">
          <h1 className="text-3xl font-bold text-center text-gray-800">Welcome to the HomePage!</h1>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
          <p className="text-center mt-4 text-gray-600">
            Discover amazing products and shop with us.
          </p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

import React from "react";
import Header from "../components/Header/Header";
import Footer from '../components/Footer';
import BrandingSection from "../components/BrandingSection";
import Categories from "../components/Categories";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header activeHeading={1} />

      {/* Separate Footer-Like Promotional Banner */}
      <section
        className="flex flex-col md:flex-row items-center justify-between p-8 gap-10 rounded-lg shadow-md"
        style={{
          background: "linear-gradient(to left, #8a8a8a, #ffffff)",
        }}
      >
        <div className="md:w-1/2 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-4xl font-bold text-black mb-4">
            Create A Space You'll Love
          </h2>
          <p className="text-lg text-black mb-6">
            Explore our exclusive range of home decor, crafted to fit your style. Add
            elegance, comfort, and beauty to every room in your home.
          </p>
          <button className="px-6 py-3 bg-[#008080] text-white font-semibold rounded-lg shadow-md hover:bg-[#006666]">
            Shop Now
          </button>
        </div>
        <div className="md:w-1/2">
          <img
            src="/assets/images/HeroImage.jpeg"
            alt="Stylish Living Room"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            style={{ maxHeight: "400px", maxWidth: "100%" }}
          />
        </div>
      </section>
      
      {/* Main Content */}
      <main className="bg-gray-50 flex-grow">
        {/* Info Cards Section */}
        <BrandingSection />

        {/* Categories Section */}
        <Categories />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;

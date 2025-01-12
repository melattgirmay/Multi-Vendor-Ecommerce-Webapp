import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import BestSellingPage from './pages/BestSellingPage';
import ProductsListPage from './pages/ProductsListPage';
import EventsPage from './pages/EventsPage';
import FAQPage from './pages/FAQPage';
import BecomeVendorPage from './pages/BecomeVendorPage';
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Cart from "./pages/Cart";
//import Wishlist from "./pages/Wishlist";
import VendorLoginPage from "./pages/VendorLoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import ProtectedRoute from './router/ProtectedRoute';
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <Routes>
      /events
      <Route path="/" element={<HomePage />} />
      <Route path="/bestselling" element={<BestSellingPage />} />
      <Route path="/products" element={<ProductsListPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/become-Vendor" element={<BecomeVendorPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      {/*<Route path="/wishlist" element={<Wishlist />} /> */}
      <Route path="/vendor-login" element={<VendorLoginPage />} />
      <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/add-product" element={<AddProduct />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

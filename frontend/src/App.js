import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import BestSellingPage from './pages/BestSellingPage';
import ProductsListPage from './pages/ProductsListPage';
import EventsPage from './pages/EventsPage';
import FAQPage from './pages/FAQPage';
import BecomeVendorPage from './pages/BecomeVendorPage';
import LoginPage from './pages/LoginPage';
import VendorLoginPage from "./pages/VendorLoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import ProtectedRoute from './router/ProtectedRoute';

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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vendor-login" element={<VendorLoginPage />} />
      <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

import axios from 'axios';

// Vendor Registration
export const registerVendor = async (vendorData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/vendors/register', vendorData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Vendor Login
export const vendorLogin = async (loginData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/vendors/login', loginData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get vendor dashboard data
export const getVendorDashboard = async (token) => {
  try {
      const response = await axios.get('http://localhost:5000/api/vendors/dashboard', {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      return response.data;
  } catch (error) {
      throw error.response?.data || error;
  }
};

// Modify getVendorProducts function to include logging

export const getVendorProducts = async (token) => {
    try {
        const response = await axios.get('http://localhost:5000/api/vendors/products/vendor', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        // Log the error details
        console.error("Error fetching vendor products:", error);
        if (error.response) {
            console.error("Response error data:", error.response.data);
            console.error("Response error status:", error.response.status);
        }
        throw error;  // Rethrow the error for further handling
    }
};

  

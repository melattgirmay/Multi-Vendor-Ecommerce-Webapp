// src/api/Vendors.js
import axios from 'axios';

// Function to handle Vendor registration
export const registerVendor = async (VendorData) => {
  const response = await axios.post('http://localhost:5000/api/Vendors/register', VendorData);
  return response.data;
};

export const vendorLogin = async (loginData) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/Vendors/login', 
      loginData, // Ensure you're sending this as the request body
      {
        headers: {
          'Content-Type': 'application/json' // Set content type to JSON
        }
      }
    );
    return response.data; // Assuming the response includes a token
  } catch (error) {
    console.error(error);
    throw error; // Propagate the error if the login fails
  }
};


import axios from 'axios';

// Function to handle Vendor registration
export const registerVendor = async (VendorData) => {
  const response = await axios.post('http://localhost:5000/api/Vendors/register', VendorData);
  return response.data;
};

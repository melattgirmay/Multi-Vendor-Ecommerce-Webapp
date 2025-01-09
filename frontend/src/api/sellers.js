import axios from 'axios';

// Function to handle seller registration
export const registerSeller = async (sellerData) => {
  const response = await axios.post('http://localhost:5000/api/sellers/register', sellerData);
  return response.data;
};

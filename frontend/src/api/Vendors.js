//C:\Users\hp\Desktop\Multi-Vendor-Ecommerce-Webapp\frontend\src\api\Vendors.js
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

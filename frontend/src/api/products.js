import axios from 'axios';

// Add a product
export const addProduct = async (productData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/products/add', productData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get all products
export const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/products');
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Get a single product by ID
export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Update a product
export const updateProduct = async (productId, productData) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/products/${productId}`, productData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Delete a product
export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/products/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

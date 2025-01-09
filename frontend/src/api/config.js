import axios from 'axios';

// Create an Axios instance with the backend base URL
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api', // Backend URL
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;

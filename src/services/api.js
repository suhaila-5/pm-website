import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add auth token if it exists
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;

export const saveBMIData = async(bmiData) => {
    try {
        const response = await api.post('/bmi', bmiData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBMIHistory = async(userId) => {
    try {
        const response = await api.get(`/bmi/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
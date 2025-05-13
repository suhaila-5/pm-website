import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor
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

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
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
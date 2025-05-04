import api from './api';

export const logProgress = async(progressData) => {
    try {
        const response = await api.post('/progress', progressData);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const getProgressHistory = async(userId) => {
    try {
        const response = await api.get(`/progress/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const updateProgress = async(id, progressData) => {
    try {
        const response = await api.put(`/progress/${id}`, progressData);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const deleteProgress = async(id) => {
    try {
        const response = await api.delete(`/progress/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};
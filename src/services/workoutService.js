import api from './api';

export const createWorkout = async(workoutData) => {
    try {
        const response = await api.post('/workouts', workoutData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const getWorkouts = async(userId) => {
    try {
        const response = await api.get(`/workouts/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const updateWorkout = async(id, workoutData) => {
    try {
        const response = await api.put(`/workouts/${id}`, workoutData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const deleteWorkout = async(id) => {
    try {
        const response = await api.delete(`/workouts/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
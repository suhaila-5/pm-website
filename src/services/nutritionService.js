import api from './api';

export const logMeal = async(mealData) => {
    try {
        const response = await api.post('/nutrition', mealData);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const getNutritionHistory = async(userId) => {
    try {
        const response = await api.get(`/nutrition/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const updateMeal = async(id, mealData) => {
    try {
        const response = await api.put(`/nutrition/${id}`, mealData);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};

export const deleteMeal = async(id) => {
    try {
        const response = await api.delete(`/nutrition/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? .data || error.message;
    }
};
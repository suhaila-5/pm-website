import React, { useState, useEffect } from 'react';
import { logMeal, getNutritionHistory } from '../services/nutritionService';
import { useAuth } from '../context/AuthContext';

const CalorieTracker = () => {
    const [meals, setMeals] = useState([]);
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [mealType, setMealType] = useState('Breakfast');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fats, setFats] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [dailyGoal] = useState(2000);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchMeals();
        }
    }, [user]);

    const fetchMeals = async () => {
        try {
            const history = await getNutritionHistory(user.id);
            setMeals(history);
        } catch (err) {
            setError('Failed to fetch meal history');
        }
    };

    const addMeal = async () => {
        try {
            setError('');
            if (!foodItem || !calories || !protein || !carbs || !fats) {
                setError('Please fill in all required fields');
                return;
            }

            const mealData = {
                userId: user.id,
                mealType,
                foods: [{ name: foodItem, calories: parseInt(calories) }],
                calories: parseInt(calories),
                protein: parseFloat(protein),
                carbs: parseFloat(carbs),
                fats: parseFloat(fats),
                waterIntake: waterIntake ? parseFloat(waterIntake) : null
            };

            await logMeal(mealData);
            setFoodItem('');
            setCalories('');
            setProtein('');
            setCarbs('');
            setFats('');
            setWaterIntake('');
            fetchMeals(); // Refresh meals after adding
        } catch (err) {
            setError('Failed to add meal');
        }
    };

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    return (
        <div className="calorie-tracker">
            <h2>Calorie Tracker</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="calorie-input">
                <select
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="meal-type-select"
                >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
                <input
                    type="text"
                    value={foodItem}
                    onChange={(e) => setFoodItem(e.target.value)}
                    placeholder="Food Item"
                />
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    placeholder="Calories"
                />
                <input
                    type="number"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    placeholder="Protein (g)"
                />
                <input
                    type="number"
                    value={carbs}
                    onChange={(e) => setCarbs(e.target.value)}
                    placeholder="Carbs (g)"
                />
                <input
                    type="number"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    placeholder="Fats (g)"
                />
                <input
                    type="number"
                    value={waterIntake}
                    onChange={(e) => setWaterIntake(e.target.value)}
                    placeholder="Water (L)"
                />
                <button onClick={addMeal}>Add Meal</button>
            </div>
            <div className="calorie-summary">
                <p>Daily Goal: {dailyGoal} calories</p>
                <p>Consumed: {totalCalories} calories</p>
                <p>Remaining: {dailyGoal - totalCalories} calories</p>
            </div>
            <div className="meal-list">
                <h3>Today's Meals</h3>
                {meals.map((meal, index) => (
                    <div key={index} className="meal-item">
                        <span>{meal.mealType}</span>
                        <span>{meal.foods[0].name}</span>
                        <span>{meal.calories} cal</span>
                        <span>{new Date(meal.date).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalorieTracker;
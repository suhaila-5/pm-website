import React, { useState } from 'react';

const CalorieTracker = () => {
    const [meals, setMeals] = useState([]);
    const [foodItem, setFoodItem] = useState('');
    const [calories, setCalories] = useState('');
    const [dailyGoal] = useState(2000);

    const addMeal = () => {
        if (foodItem && calories) {
            setMeals([...meals, { food: foodItem, calories: parseInt(calories) }]);
            setFoodItem('');
            setCalories('');
        }
    };

    const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

    return ( <
            div className = "calorie-tracker" >
            <
            h2 > Calorie Tracker < /h2> <
            div className = "calorie-input" >
            <
            input type = "text"
            value = { foodItem }
            onChange = {
                (e) => setFoodItem(e.target.value)
            }
            placeholder = "Food Item" /
            >
            <
            input type = "number"
            value = { calories }
            onChange = {
                (e) => setCalories(e.target.value)
            }
            placeholder = "Calories" /
            >
            <
            button onClick = { addMeal } > Add Meal < /button> < /
            div > <
            div className = "calorie-summary" >
            <
            p > Daily Goal: { dailyGoal }
            calories < /p> <
            p > Consumed: { totalCalories }
            calories < /p> <
            p > Remaining: { dailyGoal - totalCalories }
            calories < /p> < /
            div > <
            div className = "meal-list" >
            <
            h3 > Today 's Meals</h3> {
            meals.map((meal, index) => ( <
                div key = { index }
                className = "meal-item" >
                <
                span > { meal.food } < /span> <
                span > { meal.calories }
                cal < /span> < /
                div >
            ))
        } <
        /div> < /
    div >
);
};

export default CalorieTracker;
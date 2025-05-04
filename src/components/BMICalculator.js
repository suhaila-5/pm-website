import React, { useState } from 'react';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        setBmi(bmiValue);

        // BMI Categories
        if (bmiValue < 18.5) setCategory('Underweight');
        else if (bmiValue >= 18.5 && bmiValue < 25) setCategory('Normal');
        else if (bmiValue >= 25 && bmiValue < 30) setCategory('Overweight');
        else setCategory('Obese');
    };

    return ( <
        div className = "bmi-calculator" >
        <
        h2 > BMI Calculator < /h2> <
        div className = "input-group" >
        <
        input type = "number"
        value = { weight }
        onChange = {
            (e) => setWeight(e.target.value)
        }
        placeholder = "Weight (kg)" /
        >
        <
        input type = "number"
        value = { height }
        onChange = {
            (e) => setHeight(e.target.value)
        }
        placeholder = "Height (cm)" /
        >
        <
        button onClick = { calculateBMI } > Calculate BMI < /button> < /
        div > {
            bmi && ( <
                div className = "result" >
                <
                p > Your BMI: { bmi } < /p> <
                p > Category: { category } < /p> < /
                div >
            )
        } <
        /div>
    );
};

export default BMICalculator;
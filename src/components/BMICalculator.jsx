import React, { useState, useEffect } from 'react';
import { saveBMIData, getBMIHistory } from '../services/api';
import { useAuth } from '../context/AuthContext';

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [bmiHistory, setBmiHistory] = useState([]);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            fetchBMIHistory();
        }
    }, [user]);

    const fetchBMIHistory = async () => {
        try {
            const history = await getBMIHistory(user.id);
            setBmiHistory(history);
        } catch (err) {
            setError('Failed to fetch BMI history');
        }
    };

    const calculateBMI = async () => {
        try {
            setError('');
            if (!weight || !height) {
                setError('Please enter both weight and height');
                return;
            }

            // Save BMI data to backend
            const response = await saveBMIData({
                userId: user.id,
                weight: parseFloat(weight),
                height: parseFloat(height)
            });

            setBmi(response.bmiValue);
            setCategory(response.category);
            fetchBMIHistory(); // Refresh history after saving
        } catch (err) {
            setError('Failed to save BMI data');
        }
    };

    return (
        <div className="bmi-calculator">
            <h2>BMI Calculator</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="input-group">
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight (kg)"
                />
                <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Height (cm)"
                />
                <button onClick={calculateBMI}>Calculate BMI</button>
            </div>
            {bmi && (
                <div className="result">
                    <p>Your BMI: {bmi}</p>
                    <p>Category: {category}</p>
                </div>
            )}
            {bmiHistory.length > 0 && (
                <div className="bmi-history">
                    <h3>BMI History</h3>
                    <div className="history-list">
                        {bmiHistory.map((record, index) => (
                            <div key={index} className="history-item">
                                <span>Date: {new Date(record.date).toLocaleDateString()}</span>
                                <span>BMI: {record.bmiValue}</span>
                                <span>Category: {record.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { getBMIHistory } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressGraph = () => {
    const [bmiData, setBmiData] = useState([]);
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
            setBmiData(history);
        } catch (err) {
            setError('Failed to fetch BMI history');
        }
    };

    const chartData = {
        labels: bmiData.map(record => new Date(record.date).toLocaleDateString()),
        datasets: [{
            label: 'BMI Progress',
            data: bmiData.map(record => record.bmiValue),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'BMI Progress Over Time'
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'BMI'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Date'
                }
            }
        }
    };

    return (
        <div className="progress-graph">
            <h2>Progress Tracking</h2>
            {error && <div className="error-message">{error}</div>}
            {bmiData.length > 0 ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>No BMI data available. Start tracking your BMI to see your progress!</p>
            )}
        </div>
    );
};

export default ProgressGraph;
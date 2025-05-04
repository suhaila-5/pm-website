import React from 'react';
import { Line } from 'react-chartjs-2';
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

const ProgressGraph = ({ data }) => {
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'BMI Progress',
            data: data || [24, 23.8, 23.5, 23.2, 22.8, 22.5],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return ( <
        div className = "progress-graph" >
        <
        h2 > Progress Tracking < /h2> <
        Line data = { chartData }
        /> < /
        div >
    );
};

export default ProgressGraph;
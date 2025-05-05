import React from 'react';
import BMICalculator from './BMICalculator.jsx';
import ProgressGraph from './ProgressGraph.jsx';
import WorkoutTimer from './WorkoutTimer.jsx';
import CalorieTracker from './CalorieTracker.jsx';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Fitness Dashboard</h1>
            <div className="dashboard-grid">
                <BMICalculator />
                <ProgressGraph />
                <WorkoutTimer />
                <CalorieTracker />
            </div>
        </div>
    );
};

export default Dashboard;
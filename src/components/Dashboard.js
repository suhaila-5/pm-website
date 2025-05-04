import React from 'react';
import BMICalculator from './BMICalculator';
import ProgressGraph from './ProgressGraph';
import WorkoutTimer from './WorkoutTimer';
import CalorieTracker from './CalorieTracker';

const Dashboard = () => {
    return ( <
        div className = "dashboard" >
        <
        h1 > Fitness Dashboard < /h1> <
        div className = "dashboard-grid" >
        <
        BMICalculator / >
        <
        ProgressGraph / >
        <
        WorkoutTimer / >
        <
        CalorieTracker / >
        <
        /div> < /
        div >
    );
};

export default Dashboard;
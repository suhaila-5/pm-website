import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import WorkoutForm from './components/Workout/WorkoutForm';
import WorkoutList from './components/Workout/WorkoutList';

function App() {
    const [userId] = useState(1);
    const [showWorkouts, setShowWorkouts] = useState(false);

    return ( <
        div className = "App" >
        <
        header className = "App-header" >
        <
        h1 > Fitness Dashboard < /h1> < /
        header > <
        main >
        <
        Dashboard / >
        <
        div className = "workout-management-card" >
        <
        button onClick = {
            () => setShowWorkouts(true)
        } >
        Manage Workouts <
        /button> < /
        div > {
            showWorkouts && ( <
                div className = "workout-modal-overlay" >
                <
                div className = "workout-modal" >
                <
                button className = "close-btn"
                onClick = {
                    () => setShowWorkouts(false)
                } >
                Close <
                /button> <
                WorkoutForm userId = { userId }
                /> <
                WorkoutList userId = { userId }
                /> < /
                div > <
                /div>
            )
        } <
        /main> < /
        div >
    );
}

export default App;
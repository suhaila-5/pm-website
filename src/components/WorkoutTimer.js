import React, { useState, useEffect } from 'react';

const WorkoutTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [workoutType, setWorkoutType] = useState('');

    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return ( <
        div className = "workout-timer" >
        <
        h2 > Workout Timer < /h2> <
        select value = { workoutType }
        onChange = {
            (e) => setWorkoutType(e.target.value)
        }
        className = "workout-select" >
        <
        option value = "" > Select Workout Type < /option> <
        option value = "cardio" > Cardio < /option> <
        option value = "strength" > Strength Training < /option> <
        option value = "yoga" > Yoga < /option> <
        option value = "hiit" > HIIT < /option> < /
        select > <
        div className = "timer-display" > { formatTime(time) } < /div> <
        div className = "timer-controls" >
        <
        button onClick = {
            () => setIsRunning(!isRunning)
        } > { isRunning ? 'Pause' : 'Start' } <
        /button> <
        button onClick = {
            () => {
                setTime(0);
                setIsRunning(false);
            }
        } > Reset < /button> < /
        div > <
        /div>
    );
};

export default WorkoutTimer;
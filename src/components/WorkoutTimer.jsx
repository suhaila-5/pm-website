import React, { useState, useEffect } from 'react';
import { createWorkout } from '../services/workoutService';
import { useAuth } from '../context/AuthContext';

const WorkoutTimer = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [workoutType, setWorkoutType] = useState('');
    const [workoutName, setWorkoutName] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('Beginner');
    const [error, setError] = useState('');
    const { user } = useAuth();

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

    const handleStop = async () => {
        try {
            setError('');
            if (!workoutType || !workoutName || time === 0) {
                setError('Please fill in all required fields and complete a workout');
                return;
            }

            await createWorkout({
                userId: user.id,
                name: workoutName,
                description: description || 'Workout completed',
                duration: time,
                difficulty,
                type: workoutType,
                exercises: [{
                    name: workoutName,
                    duration: time,
                    type: workoutType
                }],
                schedule: {
                    startTime: new Date().toISOString(),
                    endTime: new Date(Date.now() + time * 1000).toISOString()
                }
            });

            setTime(0);
            setIsRunning(false);
            setWorkoutName('');
            setDescription('');
        } catch (err) {
            setError('Failed to save workout');
        }
    };

    return (
        <div className="workout-timer">
            <h2>Workout Timer</h2>
            {error && <div className="error-message">{error}</div>}
            <div className="workout-inputs">
                <input
                    type="text"
                    value={workoutName}
                    onChange={(e) => setWorkoutName(e.target.value)}
                    placeholder="Workout Name"
                    className="workout-input"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Workout Description (optional)"
                    className="workout-input"
                />
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="workout-select"
                >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <select
                    value={workoutType}
                    onChange={(e) => setWorkoutType(e.target.value)}
                    className="workout-select"
                >
                    <option value="">Select Workout Type</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Strength">Strength Training</option>
                    <option value="Flexibility">Flexibility</option>
                    <option value="HIIT">HIIT</option>
                    <option value="Custom">Custom</option>
                </select>
            </div>
            <div className="timer-display">{formatTime(time)}</div>
            <div className="timer-controls">
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Pause' : 'Start'}
                </button>
                <button onClick={handleStop}>Stop & Save</button>
                <button onClick={() => {
                    setTime(0);
                    setIsRunning(false);
                }}>Reset</button>
            </div>
        </div>
    );
};

export default WorkoutTimer;
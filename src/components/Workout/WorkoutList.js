import React, { useState, useEffect, useCallback } from 'react';
import { getWorkouts, deleteWorkout } from '../../services/workoutService';

const WorkoutList = ({ userId }) => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorkouts = useCallback(async() => {
        try {
            const data = await getWorkouts(userId);
            setWorkouts(data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch workouts');
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchWorkouts();
    }, [fetchWorkouts]);

    const handleDelete = async(id) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await deleteWorkout(id);
                setWorkouts(workouts.filter(workout => workout.id !== id));
            } catch (err) {
                setError('Failed to delete workout');
            }
        }
    };

    if (loading) return <div > Loading workouts... < /div>;
    if (error) return <div > Error: { error } < /div>;

    return ( <
            div className = "workout-list" >
            <
            h2 > Your Workouts < /h2> {
            workouts.length === 0 ? ( <
                p > No workouts found.Create your first workout! < /p>
            ) : ( <
                div className = "workout-grid" > {
                    workouts.map(workout => ( <
                        div key = { workout.id }
                        className = "workout-card" >
                        <
                        h3 > { workout.name } < /h3> <
                        p > { workout.description } < /p> <
                        div className = "workout-details" >
                        <
                        span > Duration: { workout.duration }
                        minutes < /span> <
                        span > Difficulty: { workout.difficulty } < /span> <
                        span > Type: { workout.type } < /span> < /
                        div > <
                        div className = "workout-exercises" >
                        <
                        h4 > Exercises: < /h4> <
                        ul > {
                            workout.exercises.map((exercise, index) => ( <
                                li key = { index } > { exercise } < /li>
                            ))
                        } <
                        /ul> < /
                        div > <
                        div className = "workout-schedule" >
                        <
                        h4 > Schedule: < /h4> <
                        ul > {
                            Object.entries(workout.schedule).map(([day, active]) => (
                                active && < li key = { day } > { day } < /li>
                            ))
                        } <
                        /ul> < /
                        div > <
                        button className = "delete-btn"
                        onClick = {
                            () => handleDelete(workout.id)
                        } >
                        Delete <
                        /button> < /
                        div >
                    ))
                } <
                /div>
            )
        } <
        /div>
);
};

export default WorkoutList;
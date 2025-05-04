import React, { useState } from 'react';
import { createWorkout } from '../../services/workoutService';

const WorkoutForm = ({ userId }) => {
    const [workout, setWorkout] = useState({
        name: '',
        description: '',
        duration: '',
        difficulty: 'Beginner',
        type: 'Cardio',
        exercises: [],
        schedule: {}
    });

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const workoutData = {
                ...workout,
                userId,
                exercises: workout.exercises.split(',').map(ex => ex.trim()),
                schedule: JSON.parse(workout.schedule)
            };
            await createWorkout(workoutData);
            alert('Workout created successfully!');
            // Reset form
            setWorkout({
                name: '',
                description: '',
                duration: '',
                difficulty: 'Beginner',
                type: 'Cardio',
                exercises: [],
                schedule: {}
            });
        } catch (error) {
            alert('Error creating workout: ' + error);
        }
    };

    return ( <
        form onSubmit = { handleSubmit }
        className = "workout-form" >
        <
        h2 > Create New Workout < /h2>

        <
        div className = "form-group" >
        <
        label > Workout Name < /label> <
        input type = "text"
        value = { workout.name }
        onChange = {
            (e) => setWorkout({...workout, name: e.target.value })
        }
        required /
        >
        <
        /div>

        <
        div className = "form-group" >
        <
        label > Description < /label> <
        textarea value = { workout.description }
        onChange = {
            (e) => setWorkout({...workout, description: e.target.value })
        }
        /> < /
        div >

        <
        div className = "form-group" >
        <
        label > Duration(minutes) < /label> <
        input type = "number"
        value = { workout.duration }
        onChange = {
            (e) => setWorkout({...workout, duration: e.target.value })
        }
        required /
        >
        <
        /div>

        <
        div className = "form-group" >
        <
        label > Difficulty < /label> <
        select value = { workout.difficulty }
        onChange = {
            (e) => setWorkout({...workout, difficulty: e.target.value })
        } >
        <
        option value = "Beginner" > Beginner < /option> <
        option value = "Intermediate" > Intermediate < /option> <
        option value = "Advanced" > Advanced < /option> < /
        select > <
        /div>

        <
        div className = "form-group" >
        <
        label > Type < /label> <
        select value = { workout.type }
        onChange = {
            (e) => setWorkout({...workout, type: e.target.value })
        } >
        <
        option value = "Cardio" > Cardio < /option> <
        option value = "Strength" > Strength < /option> <
        option value = "Flexibility" > Flexibility < /option> <
        option value = "HIIT" > HIIT < /option> <
        option value = "Custom" > Custom < /option> < /
        select > <
        /div>

        <
        div className = "form-group" >
        <
        label > Exercises(comma - separated) < /label> <
        input type = "text"
        value = { workout.exercises }
        onChange = {
            (e) => setWorkout({...workout, exercises: e.target.value })
        }
        placeholder = "e.g., Push-ups, Squats, Lunges" /
        >
        <
        /div>

        <
        div className = "form-group" >
        <
        label > Schedule(JSON format) < /label> <
        input type = "text"
        value = { workout.schedule }
        onChange = {
            (e) => setWorkout({...workout, schedule: e.target.value })
        }
        placeholder = '{"monday": true, "wednesday": true, "friday": true}' /
        >
        <
        /div>

        <
        button type = "submit" > Create Workout < /button> < /
        form >
    );
};

export default WorkoutForm;
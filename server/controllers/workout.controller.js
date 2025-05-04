const Workout = require('../models/Workout');

// Create a new workout
exports.createWorkout = async(req, res) => {
    try {
        console.log('Received workout data:', req.body); // Debug log
        const workout = await Workout.create(req.body);
        console.log('Saved workout:', workout); // Debug log
        res.status(201).json(workout);
    } catch (error) {
        console.error('Error saving workout:', error); // Debug log
        res.status(400).json({ message: error.message });
    }
};

// Get all workouts for a user
exports.getWorkouts = async(req, res) => {
    try {
        const workouts = await Workout.findAll({
            where: { userId: req.params.userId }
        });
        res.json(workouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a workout
exports.updateWorkout = async(req, res) => {
    try {
        const workout = await Workout.findByPk(req.params.id);
        if (workout) {
            await workout.update(req.body);
            res.json(workout);
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a workout
exports.deleteWorkout = async(req, res) => {
    try {
        const workout = await Workout.findByPk(req.params.id);
        if (workout) {
            await workout.destroy();
            res.json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
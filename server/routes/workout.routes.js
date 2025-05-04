const express = require('express');
const router = express.Router();
const { createWorkout, getWorkouts, updateWorkout, deleteWorkout } = require('../controllers/workout.controller');

// Workout routes
router.post('/', createWorkout);
router.get('/:userId', getWorkouts);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
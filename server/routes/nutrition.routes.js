const express = require('express');
const router = express.Router();
const { logMeal, getNutritionHistory, updateMeal, deleteMeal } = require('../controllers/nutrition.controller');

// Nutrition routes
router.post('/', logMeal);
router.get('/:userId', getNutritionHistory);
router.put('/:id', updateMeal);
router.delete('/:id', deleteMeal);

module.exports = router;
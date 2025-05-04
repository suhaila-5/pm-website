const Nutrition = require('../models/Nutrition');

// Log a new meal
exports.logMeal = async(req, res) => {
    try {
        const nutrition = await Nutrition.create(req.body);
        res.status(201).json(nutrition);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get nutrition history for a user
exports.getNutritionHistory = async(req, res) => {
    try {
        const nutrition = await Nutrition.findAll({
            where: { userId: req.params.userId }
        });
        res.json(nutrition);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a meal entry
exports.updateMeal = async(req, res) => {
    try {
        const nutrition = await Nutrition.findByPk(req.params.id);
        if (nutrition) {
            await nutrition.update(req.body);
            res.json(nutrition);
        } else {
            res.status(404).json({ message: 'Meal entry not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a meal entry
exports.deleteMeal = async(req, res) => {
    try {
        const nutrition = await Nutrition.findByPk(req.params.id);
        if (nutrition) {
            await nutrition.destroy();
            res.json({ message: 'Meal entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Meal entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
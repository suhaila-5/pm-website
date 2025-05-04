const Progress = require('../models/Progress');

// Log new progress
exports.logProgress = async(req, res) => {
    try {
        const progress = await Progress.create(req.body);
        res.status(201).json(progress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get progress history for a user
exports.getProgressHistory = async(req, res) => {
    try {
        const progress = await Progress.findAll({
            where: { userId: req.params.userId }
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update progress entry
exports.updateProgress = async(req, res) => {
    try {
        const progress = await Progress.findByPk(req.params.id);
        if (progress) {
            await progress.update(req.body);
            res.json(progress);
        } else {
            res.status(404).json({ message: 'Progress entry not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete progress entry
exports.deleteProgress = async(req, res) => {
    try {
        const progress = await Progress.findByPk(req.params.id);
        if (progress) {
            await progress.destroy();
            res.json({ message: 'Progress entry deleted successfully' });
        } else {
            res.status(404).json({ message: 'Progress entry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
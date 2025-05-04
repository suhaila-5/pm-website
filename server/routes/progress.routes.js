const express = require('express');
const router = express.Router();
const { logProgress, getProgressHistory, updateProgress, deleteProgress } = require('../controllers/progress.controller');

// Progress routes
router.post('/', logProgress);
router.get('/:userId', getProgressHistory);
router.put('/:id', updateProgress);
router.delete('/:id', deleteProgress);

module.exports = router;
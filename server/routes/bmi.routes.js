const express = require('express');
const router = express.Router();
const { saveBMI, getBMIHistory } = require('../controllers/bmi.controller');

// BMI routes
router.post('/', saveBMI);
router.get('/:userId', getBMIHistory);

module.exports = router;
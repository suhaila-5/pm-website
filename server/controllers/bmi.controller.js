const BMI = require('../models/BMI');

const saveBMI = async(req, res) => {
    try {
        const { userId, weight, height } = req.body;

        if (!userId || !weight || !height) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const bmiValue = (weight / ((height / 100) * (height / 100))).toFixed(2);

        // Determine BMI category
        let category = '';
        if (bmiValue < 18.5) category = 'Underweight';
        else if (bmiValue >= 18.5 && bmiValue < 25) category = 'Normal';
        else if (bmiValue >= 25 && bmiValue < 30) category = 'Overweight';
        else category = 'Obese';

        const bmi = await BMI.create({
            userId,
            weight,
            height,
            bmiValue: parseFloat(bmiValue),
            category,
            date: new Date()
        });

        res.status(201).json(bmi);
    } catch (error) {
        console.error('Error saving BMI:', error);
        res.status(400).json({ message: error.message });
    }
};

const getBMIHistory = async(req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const bmiHistory = await BMI.findAll({
            where: { userId },
            order: [
                ['date', 'DESC']
            ]
        });

        res.json(bmiHistory);
    } catch (error) {
        console.error('Error fetching BMI history:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { saveBMI, getBMIHistory };
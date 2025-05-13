const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db.config');
const User = require('./models/User');
const BMI = require('./models/BMI');
const Workout = require('./models/Workout');
const Nutrition = require('./models/Nutrition');
const Progress = require('./models/Progress');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Force sync in development mode only
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ force: true }); // This will drop and recreate tables
            console.log('Database tables dropped and recreated.');
        } else {
            await sequelize.sync(); // Normal sync in production
        }
        console.log('All models were synchronized successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        process.exit(1); // Exit if database connection fails
    }
}

initializeDatabase();

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/bmi', require('./routes/bmi.routes'));
app.use('/api/users', require('./routes/user.routes'));
app.use('/api/workouts', require('./routes/workout.routes'));
app.use('/api/nutrition', require('./routes/nutrition.routes'));
app.use('/api/progress', require('./routes/progress.routes'));

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Workout = sequelize.define('Workout', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('Cardio', 'Strength', 'Flexibility', 'HIIT', 'Custom'),
        allowNull: false
    },
    exercises: {
        type: DataTypes.JSON,
        allowNull: false
    },
    schedule: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    timestamps: true
});

// Define the relationship
User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

module.exports = Workout;
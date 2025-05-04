const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./User');

const Nutrition = sequelize.define('Nutrition', {
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
    mealType: {
        type: DataTypes.ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    foods: {
        type: DataTypes.JSON,
        allowNull: false
    },
    calories: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    protein: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    carbs: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    fats: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    waterIntake: {
        type: DataTypes.FLOAT, // in liters
        allowNull: true
    }
}, {
    timestamps: true
});

// Define the relationship
User.hasMany(Nutrition, { foreignKey: 'userId' });
Nutrition.belongsTo(User, { foreignKey: 'userId' });

module.exports = Nutrition;